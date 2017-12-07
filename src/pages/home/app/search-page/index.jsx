import { PureComponent } from 'react'
import {
  Row, Col, Card, Form, Input, Select, Icon, Button, Dropdown,
  Menu, InputNumber, DatePicker, Modal, message
} from 'igroot'

import { Client } from '@@'
import { StandardTable } from '@/components/standard-table'
import styles from './index.scss'
import { tableList } from '@/util/data'

const FormItem = Form.Item
const { Option } = Select
const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',')

@Form.create()
export class TableList extends PureComponent {
  state = {
    addInputValue: '',
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    data: {},
    loading: false
  }


  componentWillMount() {
    this.setState({ data: this.getData() })
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { formValues } = this.state

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj }
      newObj[key] = getValue(filtersArg[key])
      return newObj
    }, {})

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    }
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`
    }

    this.setState({
      loading: true,
      data: this.getData(params)
    })

    setTimeout(() => { this.setState({ loading: false }) }, 5000)
  }

  /**
   * 重置按钮
   */
  handleFormReset = () => {
    const { form } = this.props
    form.resetFields()
    this.setState({
      data: this.getData()
    })
  }

  /**
   * 展开按钮
   */
  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    })
  }

  /**
   * 勾选数据显示批量操作按钮
   */
  handleMenuClick = (e) => {
    const { dispatch } = this.props
    const { selectedRows } = this.state

    if (!selectedRows) return

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            })
          },
        })
        break
      default:
        break
    }
  }

  /**
   * 绑定选中了的数据
   */
  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    })
  }

  /**
   * 查询按钮
   */
  handleSearch = (e) => {
    e.preventDefault()

    const { form } = this.props

    form.validateFields((err, fieldsValue) => {
      if (err) return

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.format('YYYY-MM-DD'),
      }
      this.setState({
        loading: true, data: this.getData(values)
      }, () => { setTimeout(() => { this.setState({ loading: false }), 5000 }) })
    })
  }

  /**
   * 新建按钮
   */
  handleModalVisible = (flag) => {
    this.setState({
      modalVisible: !!flag,
    })
  }

  /**
   * 新建弹出框 文本框赋值
   */
  handleAddInput = (e) => {
    this.setState({
      addInputValue: e.target.value,
    })
  }

  /**
   * 新建弹出框---确定按钮
   */
  handleAdd = () => {
    message.success(`${this.state.addInputValue},添加成功`)
    this.setState({
      modalVisible: false,
    })
  }

  /**
   * 获取初始表格数据
   */
  getData = (params) => {
    console.log(params, '请求参数')
    console.log(tableList, 'table')
    return tableList
  }
  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={8}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className="submitButtons">
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
                展开 <Icon type="down" />
              </a>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }

  /**
   * 渲染对应的过滤选项
   */
  renderAdvancedForm() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={8}>
          <Col md={8} sm={24}>
            <FormItem label="规则编号">
              {getFieldDecorator('no')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="调用次数">
              {getFieldDecorator('number')(
                <InputNumber style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col md={8} sm={24}>
            <FormItem label="更新日期">
              {getFieldDecorator('updatedAt')(
                <DatePicker style={{ width: '100%' }} placeholder="请输入更新日期" onChange={(date, dateString) => { }} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status3')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="使用状态">
              {getFieldDecorator('status4')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">关闭</Option>
                  <Option value="1">运行中</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <span style={{ float: 'right', marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">查询</Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
            <a style={{ marginLeft: 8 }} onClick={this.toggleForm}>
              收起 <Icon type="up" />
            </a>
          </span>
        </div>
      </Form>
    )
  }

  /**
   * 判定是否有收起操作
   */
  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm()
  }

  render() {
    const { loading, data, selectedRows, modalVisible, addInputValue } = this.state

    const menu = (
      <Menu onClick={this.handleMenuClick} selectedKeys={[]}>
        <Menu.Item key="remove">删除</Menu.Item>
        <Menu.Item key="approval">批量审批</Menu.Item>
      </Menu>
    )

    return (
      <div>
        <Card bordered={false}>
          <div className="tableList">
            <div className="tableListForm">
              {this.renderForm()}
            </div>
            <div className="tableListOperator">
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
              {
                selectedRows.length > 0 && (
                  <span>
                    <Button>批量操作</Button>
                    <Dropdown overlay={menu}>
                      <Button>
                        更多操作 <Icon type="down" />
                      </Button>
                    </Dropdown>
                  </span>
                )
              }
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <Modal
          title="新建规则"
          visible={modalVisible}
          onOk={this.handleAdd}
          onCancel={() => this.handleModalVisible()}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="描述"
          >
            <Input placeholder="请输入" onChange={this.handleAddInput} value={addInputValue} />
          </FormItem>
        </Modal>
      </div>
    )
  }
}
