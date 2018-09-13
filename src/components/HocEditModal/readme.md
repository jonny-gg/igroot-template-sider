# 高阶表单模态框

## 配置

1. formOptions {object}  表单配置项
   1. formKey {string} 当表单为更新模式下，需要带给后端接口的键值  
   2. parmasFilterFunction {function} 当表单为更新模式下，过滤返回setFieldsValue的对象

2. modalProps {object} 模态框props
3. create {function} 创建表单的函数，以下是几个函数接受参数
   1. parmas 用户输入的表单值
   2. state 模态框的state
   3. cb 请求结果的回调函数，用true和false来传递成功和失败
4. update {function} 创建表单的函数，以下是几个函数接受参数
   1. parmas 用户输入的表单值
   2. state 模态框的state
   3. cb 请求结果的回调函数，用true和false来传递成功和失败



## 模态框生命周期

1. modalWillOpen  模态框打开时的生命周期，如果为更新模式会传入 parmas 的值
2. modalWillClose 模态框关闭时的声明周期



## 示例

使用装饰器赋予能力

```jsx
import React, { Component } from 'react'
import { Form, Input } from 'igroot'
import HocModal from '@/components/EditModal'
const { Item } = Form
import { createSupplier } from '@/apis/supplier/createSupplier'
import { updateSupplier } from '@/apis/supplier/updateSupplier'
@HocModal({
  modalProps: {
    title: '厂商配置',
    width: 600
  },
  create: (parmas, state, cb) => {
    createSupplier(parmas).then(res => {
      if (res.data.createSupplier.result) {
        cb(true)
      } else {
        cb(false)
      }
    })
  },
  update: (parmas, state, cb) => {
    updateSupplier(parmas).then(res => {
      if (res.data.updateSupplier.result) {
        cb(true)
      } else {
        cb(false)
      }
    })
  },
  formOptions: {
    formKey: 'id',
    parmasFilterFunction: params => {
      const { supplier_name, supplier_ename, supplier_cname_suffix, remark } = params
      return { supplier_name, supplier_ename, supplier_cname_suffix, remark }
    }
  }
})
export default class Create extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Item label="厂商名称">
          {
            getFieldDecorator('supplier_name', {
              rules: [{
                required: true, message: '厂商名称必填',
              }]
            })(
              <Input />
            )
          }
        </Item>
        <Item label="厂商英文名">
          {
            getFieldDecorator('supplier_ename', {

              rules: [{
                required: true, message: '厂商英文名必填',
              }]

            })(
              <Input />
            )
          }
        </Item>
        <Item label="默认cname后缀">
          {
            getFieldDecorator('supplier_cname_suffix')(
              <Input />
            )
          }
        </Item>
        <Item label="备注">
          {
            getFieldDecorator('remark')(
              <Input.TextArea />
            )
          }
        </Item>
      </div>
    )
  }
}
```

在页面中引用

```jsx
import React, { Component } from 'react'
import { Row, Col, Table, Button, message, Popconfirm } from 'igroot'
import { deleteSupplier } from '@/apis/supplier/deleteSupplier'
import SupplierEditModal from './SupplierEditModal'
export class List extends Component {
  state = {
    expandKeys: [],
    columns: [
      {
        title: '厂商',
        dataIndex: 'supplier_name',
        width: 150,
      },
      {
        title: '厂商英文名',
        dataIndex: 'supplier_ename',
        width: 150,
      },
      {
        title: '默认cname后缀',
        dataIndex: 'supplier_cname_suffix',
        width: 200,

      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        width: 200,

      },
      {
        title: '备注',
        dataIndex: 'remark',
        width: 200

      },
      {
        title: '操作',
        dataIndex: 'handel',
        width: 80,
        render: (text, row) => <div style={{ textAlign: 'center' }}>
          <a style={{ marginRight: 8 }} onClick={() => this.edit(row)}>编辑</a>
          <Popconfirm title="确定删除？" onConfirm={() => this.del(row.id)}>
            <a>删除</a>
          </Popconfirm>
        </div>
      }
    ]
  }

  del = id => {
    if (this.delLoading) {
      return false
    }
    const loading = message.loading('删除中，请稍后....')
    deleteSupplier({ id: [id] }).then(res => {
      loading()
      this.delLoading = false
      if (res.data.deleteSupplier.result) {
        message.success('删除成功')
        this.props.handleReload()
      }
    })
  }

  edit = row => {
    this.Update(row)
  }

  render() {
    const { columns } = this.state
    return (
      <Row>
        <Col span={24} style={{ textAlign: 'right' }}>
          <Button type="primary" onClick={() => this.Create()} style={{ marginRight: 8 }}>
            新增
          </Button>
        </Col>
        <Col span={24} style={{ marginTop: 8 }}>
          <Table
            columns={columns}
            {...this.props.tableProps}
          />
        </Col>
        <SupplierEditModal
          getCreateFunction={fun => this.Create = fun}
          getUpdateFunction={fun => this.Update = fun}
          reload={this.props.handleReload}
        />
      </Row>
    )
  }
}

```