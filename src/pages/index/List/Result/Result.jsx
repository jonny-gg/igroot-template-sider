'use strict'

import React, { Component } from 'react'
import { Card, Table, Button, Popconfirm } from 'igroot'

export default class Result extends Component {
  constructor(props) {
    super(props)
    const { dataSource } = props

    this.state = {
      dataSource
    }
  }

  componentWillReceiveProps(nextProps) {
    if ('dataSource' in nextProps) {
      const { dataSource } = nextProps
      this.setState({
        dataSource
      })
    }
  }

  handleAdd = () => {
    const { beforeAdd } = this.props
    beforeAdd && beforeAdd()
  }

  handleDelete = (id) => {
    const { onDelete } = this.props
    onDelete && onDelete(id)
  }

  handleUpdate = (id) => {
    const { beforeUpdate } = this.props
    beforeUpdate && beforeUpdate(id)
  }

  render() {
    const { title } = this.props
    const { dataSource } = this.state
    const columns = [
      {
        title: '分隔符',
        dataIndex: 'value', // 
        key: 'value',
        width: '20%'
      }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: '20%'
      }, {
        title: '备注',
        dataIndex: 'comment',
        key: 'comment',
        width: '40%'
      }, {
        title: '操作',
        dataIndex: 'opt',
        key: 'opt',
        width: '20%',
        render: (text, record) => {
          return (
            <div key={record.id}>
              <a onClick={() => this.handleUpdate(record.id)}>修改</a>
              <span className="ant-divider" />
              <Popconfirm title={`确定删除该${title}吗？`} onConfirm={() => this.handleDelete(record.id)}>
                <a>删除</a>
              </Popconfirm>
            </div>
          )
        }
      }
    ]
    return (
      <div>
        <Card style={{ marginTop: 10 }}>
          <Button type="primary" onClick={this.handleAdd}>
            添加{title}
          </Button>
          <Table style={{ marginTop: 10 }} columns={columns} dataSource={dataSource} pagination={false} />
        </Card>
      </div>
    )
  }
}

