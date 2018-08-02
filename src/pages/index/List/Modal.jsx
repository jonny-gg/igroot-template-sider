import { Component } from 'react'
import { Form, Input, Modal, Select, Spin } from 'igroot'

const { Item } = Form
const { Option } = Select
class _ModalBase extends Component {
  state = {
    ispList: [],
    provinceList: [],
    statusList: []
  }

  componentDidMount() {
    this.props.init(this)
  }

  getData = (value) => {
    this.setState({ loading: true }, () => {
      // 初始化数据并设置值
      const ispList = [{ val: 'dx', name: '电信' }, { val: 'yd', name: '移动' }, { val: 'lt', name: '联通' }]
      const provinceList = [{ val: 'fj', name: '福建' }, { val: 'gd', name: '广东' }, { val: 'zj', name: '浙江' }]
      const statusList = [{ val: '1000', name: '有效' }, { val: '1001', name: '失效' }]
      this.setState({ ispList, provinceList, statusList, loading: false }, () => {
        const { setFieldsValue } = this.props.form
        setFieldsValue(value)
      })
    })

  }

  onConfirm = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, value) => {
      if (err) return
      this.setState({ loading: true })
      if (this.state.probe_id) {
        value.id = this.state.probe_id
        // updateProbeApi(value).then(res => {
        //   this.props.refresh()
        //   this.onCancel()
        // }).catch(error => this.setState({ loading: false }))


        // update接口编写处 可参照上方注释
      } else {
        // addProbeApi(value).then(res => {
        //   console.log(res)
        //   this.props.refresh()
        //   this.onCancel()
        // }).catch(error => this.setState({ loading: false }))

        // add接口编写处 可参照上方注释
      }
      this.setState({ loading: false })
    })
  }

  // 打开模态框的初始化操作
  show = (value = {}) => {
    const { resetFields } = this.props.form
    resetFields()

    if (value.id) {
      value.isp_id = `${value.isp_id}`
      value.loc_id = `${value.loc_id}`
      this.setState({ probe_id: value.id })

    }
    this.getData(value)
    this.setState({ visible: true })
  }

  onCancel = () => {
    this.setState({ visible: false, loading: false })
  }

  render() {
    const { title, form } = this.props
    const { ispList, provinceList, visible, loading, statusList } = this.state
    const { getFieldDecorator } = form
    const itemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
        md: { span: 6 },
      },

      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 18 },
      }
    }

    const rules = label => ({ rules: [{ required: true, message: `${label}为必填项` }] })

    return (
      <Modal
        visible={visible}
        title={title}
        okText="确定"
        cancelText="取消"
        onCancel={this.onCancel}
        onOk={this.onConfirm}
      >
        <Spin spinning={loading} tip="数据交互中,请稍等...">
          <Form layout="horizontal">
            <Item label="名称" {...itemLayout}>
              {getFieldDecorator('name', { ...rules('名称') })(
                <Input placeholder="请输入名称" />
              )}
            </Item>
            <Item label="状态" {...itemLayout}>
              {getFieldDecorator('status', { ...rules('状态') })(
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                  {statusList.length > 0 && statusList.map(item => (
                    <Option key={`${item.val}`}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </Item>
            <Item label="运营商" {...itemLayout}>
              {getFieldDecorator('isp_id', { ...rules('运营商') })(
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                  {ispList.length > 0 && ispList.map(item => (
                    <Option key={`${item.val}`}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </Item>
            <Item label="省份" {...itemLayout}>
              {getFieldDecorator('province_id', { ...rules('省份') })(
                <Select
                  allowClear
                  showSearch
                  optionFilterProp="children"
                >
                  {provinceList.length > 0 && provinceList.map(item => (
                    <Option key={`${item.val}`}>{item.name}</Option>
                  ))}
                </Select>
              )}
            </Item>

          </Form>
        </Spin>
      </Modal>
    )
  }
}

export const DemoModal = Form.create()(_ModalBase)
