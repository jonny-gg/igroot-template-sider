'use strict'

import React, { Component } from 'react'

import Filter from './Filter'
import Result from './Result'
import Editor from './Editor'

// apis
import { getProjectsApi } from '@/apis/list'

/**
 * 列表管理页
 */
export  class List extends Component {
  constructor(props) {
    super(props)

    this.state = {
      id: -1,
      eidtorVisible: true,
      editorData: null,
      editorType: 'add',
      title: '',
      dataSource: []
    }
  }

  componentDidMount() {
    this.getList()
  }

  getList = (params) => {
    getProjectsApi(params).then(dataSource => {
      this.setState({
        dataSource
      })
    })
  }

  resetTable = () => {
    this.setState({
      editorVisible: false
    }, () => {
      this.getList()
    })
  }

  handleBeforeAdd = () => {
    this.setState({
      editorVisible: true,
      editorType: 'add',
      title: '添加分隔符'
    })
  }

  handleAdd = (params) => {
    this.api.add(params).then(status => {
      status && this.resetTable()
    })
  }

  handleDelete = (id) => {
    this.api.delete(id).then(status => {
      status && this.resetTable()
    })
  }

  handleBeforeUpdate = (id) => {
    const { dataSource } = this.state 
    const editorData = dataSource.filter(item => item.id === id)[0]

    this.setState({
      id,
      editorData,
      editorVisible: true,
      editorType: 'update',
      title: '修改分隔符'
    })
  }

  handleUpdate = (params) => {
    const { id } = this.state
    const newParams = {...params, ...{ id }}
    this.api.update(newParams).then(status => {
      status && this.resetTable()
    })
  }

  handleFilter = (values) => {
    this.getList(values)
  }

  render() {
    const { editorVisible, editorType, editorData, dataSource, title } = this.state 

    return (
      <div>
        <Filter 
          onFilter={this.handleFilter}
        />
        <Result 
          title="分隔符"
          beforeAdd={this.handleBeforeAdd} 
          onDelete={this.handleDelete} 
          beforeUpdate={this.handleBeforeUpdate} 
          dataSource={dataSource}
        />
        <Editor 
          visible={editorVisible}
          type={editorType}
          data={editorData}
          title={title}
          onAdd={this.handleAdd}
          onUpdate={this.handleUpdate}
        />
      </div>
    )
  }
}

const styles = {
  marginTop: {
    marginTop: 10
  }
}
