import React, { Component } from 'react'
import { Input } from 'igroot'
import HocModal, { Item } from '@/components/HocEditModal'
import { createSupplier, updateSupplier } from '@/api/list'
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