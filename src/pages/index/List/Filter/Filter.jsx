'use strict'

import React, { Component } from 'react'
import { Card, Row, Col, Input, Form } from 'igroot'

import { FormItem, FormContainer, FormOption } from 'igroot-form-container'

/**
 * 搜索过滤
 */
export default class Filter extends Component {
  constructor(props) {
    super(props)
  }

  handleSubmit = (params) => {
    const { onFilter } = this.props 
    onFilter && onFilter(params)
  }

  render() {
    return (
      <div>
        <Card>
          <div className="tableList">
            <div className="tableListForm">
              <FormContainer>
                <Row>
                  <Col span={8}>
                    <FormItem label="备注" name="comment">
                      <Input placeholder="输入要搜索的备注关键字"/>
                    </FormItem>
                  </Col>
                  <Col span={8}>
                    <FormOption
                      option={['submit', 'reset']}
                      submitText="搜索"
                      onSubmit={this.handleSubmit}
                    />
                  </Col>
                </Row>
              </FormContainer>
            </div>
          </div>
        </Card>
      </div>
    )
  }
}
