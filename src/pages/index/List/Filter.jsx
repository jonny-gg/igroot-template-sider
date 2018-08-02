import { Component } from 'react'
import { Form, Select, Button, Row, Col, Input } from 'igroot'
const { Option } = Select
const FormItem = Form.Item
class _DemoFilter extends Component {

  state = {
    ispList: [],
    provinceList: [],
    ipList: [],
    statusList: [{ val: '0', name: '生效' }, { val: '1', name: '生效' }]
  }
  componentWillMount() {
    this.getData()
  }
  getData = () => {
    /**
     * 初始化下拉框的数据, 请在此处设置
     * 数据的格式请按照以下格式给出
     * 注意事项: val 和 name 最好都是string类型
     */
    const ispList = [{ val: 'dx', name: '电信' }, { val: 'yd', name: '移动' }, { val: 'lt', name: '联通' }]
    const provinceList = [{ val: 'fj', name: '福建' }, { val: 'gd', name: '广东' }, { val: 'zj', name: '浙江' }]
    const statusList = [{ val: '1000', name: '有效' }, { val: '1001', name: '失效' }]

    this.setState({ ispList, provinceList, statusList })
  }
  /**
   * 重置按钮
   */
  handleFormReset = () => {
    const { form } = this.props
    form.resetFields()
  }

  /**
   * 查询按钮
   */
  handleSearch = (e) => {
    e.preventDefault()

    const { form } = this.props

    form.validateFields((err, fieldsValue) => {
      if (err) return

      this.props.onSubmit(fieldsValue)
    })
  }

  // 点击新增操作
  addItem = () => {
    this.props.addItem()
  }

  // filter模板
  renderForm() {
    const { getFieldDecorator } = this.props.form
    const { ispList, statusList, ipList } = this.state
    const formItemLayout = {
      labelCol: { lg: 6, md: 10, sm: 12 },
      wrapperCol: { lg: 18, md: 14, sm: 12 }
    }
    return (
      <Form onSubmit={this.handleSearch}>
        <Row gutter={8}>
          <Col span={4}>
            <FormItem label="运营商" {...formItemLayout}>
              {getFieldDecorator('isp_id')(
                <Select
                  placeholder="请选择"
                  allowClear
                  showSearch
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {ispList.length > 0
                    ? ispList.map(item => (
                      <Option key={`${item.val}`}>{item.name}</Option>)
                    ) : []}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label="省份" {...formItemLayout}>
              {getFieldDecorator('province_id')(
                <Select
                  placeholder="请选择"
                  allowClear
                  showSearch
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {ipList.length > 0
                    ? ipList.map(item => (
                      <Option key={`${item.probe_ip}`}>{item.probe_ip}</Option>)
                    ) : []}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label="状态" {...formItemLayout}>
              {getFieldDecorator('status')(
                <Select
                  placeholder="请选择"
                  allowClear
                  showSearch
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {statusList.length > 0
                    ? statusList.map(item => (
                      <Option key={`${item.val}`}>{item.name}</Option>)
                    ) : []}
                </Select>
              )}
            </FormItem>
          </Col>
          <Col span={4}>
            <FormItem label="IP地址" {...formItemLayout}>
              {getFieldDecorator('ip')(
                <Input />
              )}
            </FormItem>
          </Col>
          <Col span={8}>
            <span className="submitButtons">
              <Button type="primary" htmlType="submit">查询</Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>重置</Button>
              <Button type="primary" style={{ float: 'right' }} onClick={this.addItem}>新增</Button>
            </span>
          </Col>
        </Row>
      </Form>
    )
  }
  render() {
    return (
      <div>
        {this.renderForm()}
      </div>
    )
  }
}

export const DemoFilter = Form.create()(_DemoFilter)