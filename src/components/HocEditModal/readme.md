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
import { Input } from 'igroot'
import HocModal, { Item } from '@/components/EditModal/'
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

