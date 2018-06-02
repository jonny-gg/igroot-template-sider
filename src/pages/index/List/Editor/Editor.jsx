'use strict'

import React, { Component } from 'react'
import { Card, Row, Col, Input, Modal, Radio } from 'igroot'

import { FormItem, FormContainer, FormOption } from 'igroot-form-container'

const { TextArea } = Input
const RadioButton = Radio.Button
const RadioGroup = Radio.Group

/**
 * 编辑框
 */
export default class Editor extends Component {
  constructor(props) {
    super(props)

    const { visible, data, type } = props 

    this.state = {
      visible,
      data,
      type 
    }
  }

  componentWillReceiveProps(nextProps) {
    const { type } = nextProps

    this.setState({
      ...nextProps
    },()=> {
      if ('data' in nextProps &&　type === 'update') {
        setTimeout(() => {
          const { data } = nextProps
          this.form && this.form.setFieldsValue(data)
        }, 100)
      }
    })
  }

  handleGetForm = (form) => {
    this.form = form 
  }

  handleSubmit = (params) => {
    const { type } = this.state 
    const { onAdd, onUpdate } = this.props 

    type === 'add' ? onAdd(params) : onUpdate(params)
  }

  handleCancel = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const { visible, data, type, title } = this.state 

    return (
      <Modal
          visible={visible}
          title={title}
          footer={null}
          onCancel={this.handleCancel}
          width="50%"
        >
        <Card>
          <div className='tableList'>
            <div className='tableListForm'>
              <FormContainer onGetForm={(form) => this.handleGetForm(form)}>
                <Row>
                  <Col span={12}>
                    <FormItem label="类型" name="type" initialValue="a" required>
                      <RadioGroup>
                        <RadioButton value="a">可见</RadioButton>
                        <RadioButton value="b">不可见</RadioButton>
                      </RadioGroup>
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FormItem label="名称" name="value"  required>
                      <Input  />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FormItem label="备注" name="comment" required>
                      <TextArea />
                    </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <FormOption
                      option={['submit', 'reset']}
                      submitText="确定"
                      onSubmit={this.handleSubmit}
                    />
                  </Col>
                </Row>
              </FormContainer>
            </div>
          </div>
        </Card>
      </Modal>
    )
  }
}
