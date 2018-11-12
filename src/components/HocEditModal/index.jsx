import React from 'react'
import { Modal, Form, Spin, message } from 'igroot'
const { Item } = Form
function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component'
}
/**
 * @param {object} formOptions 表单配置项
 * @param {function}  create 提交函数
 * @param {function} update 更新函数
 * @param {object} modalProps  模态框配置
 * @description 类声明生命周期
 * 1.modalWillOpen 模态框开启时
 * 2.modalWillClose 模态框关闭时
 */
export { Item }

export default ({ formOptions, create, modalProps, update }) =>
  WrappedComponent => {
    class EditModal extends WrappedComponent {
      static displayName = `EditModal(${getDisplayName(WrappedComponent)})`
      constructor() {
        super()
        this.state = {
          ...this.state,
          visible: false,
          loading: false,
          stateTitle: '新建'
        }
        this.modalWillOpen = this.modalWillOpen ? this.modalWillOpen.bind(this) : () => { }
        this.modalWillClose = this.modalWillClose ? this.modalWillClose.bind(this) : () => { }
      }

      componentWillMount() {
        super.componentWillMount && super.componentWillMount()
        this.props.getCreateFunction && this.props.getCreateFunction(this._openWithoutSetValue)
        this.props.getUpdateFunction && this.props.getUpdateFunction(this._openWithSetValue)
      }

      _openWithSetValue = parmas => {
        // 模态框打开
        this.modalWillOpen(parmas)
        this.setState({ visible: true, stateTitle: '修改' })
        const { parmasFilterFunction, formKey } = formOptions
        const state = this.state
        this[formKey] = parmas[formKey]
        const { resetFields, setFieldsValue } = this.props.form
        let _parmas = {}
        _parmas = parmasFilterFunction ? parmasFilterFunction(parmas, state) : parmas
        resetFields()
        setTimeout(() => {
          setFieldsValue(_parmas)
        }, 0)
      }

      _openWithoutSetValue = () => {
        const { formKey } = formOptions
        this.modalWillOpen()
        this.setState({ visible: true, stateTitle: '新建' })
        this[formKey] = undefined
        const { resetFields } = this.props.form
        resetFields()
      }

      formCreate = parmas => {
        const state = this.state
        create && create(parmas, state, res => {
          this.setState({ loading: false })
          if (res) {
            message.success('操作成功！')
            // 模态框关闭
            this.modalWillClose()
            this.setState({ visible: false })
            this.props.reload && this.props.reload()
          } else {
            message.error(' 操作失败')
          }
        })
      }

      formUpdate = parmas => {
        const state = this.state
        update && update(parmas, state, res => {
          this.setState({ loading: false })
          if (res) {
            message.success('操作成功！')
            // 模态框关闭
            this.modalWillClose()
            this.setState({ visible: false })
            this.props.reload && this.props.reload()
          } else {
            message.error('操作失败')
          }
        })
      }


      submit = () => {
        const { validateFields } = this.props.form
        validateFields((err, parmas) => {
          if (err) return
          const { formKey } = formOptions
          this.setState({ loading: true })
          if (this[formKey]) {
            parmas[formKey] = this[formKey]
            this.formUpdate(parmas)
          } else {
            this.formCreate(parmas)
          }
        })
      }

      render() {
        const { visible, loading, stateTitle } = this.state
        return <Modal
          title={`${stateTitle}${modalProps.title ? modalProps.title : ''}`}
          {...modalProps}
          visible={visible}
          onCancel={() => this.setState({ visible: false })}
          onOk={this.submit}
          confirmLoading={loading}
        >
          <Spin spinning={loading}>
            <Form>
              {super.render()}
            </Form>
          </Spin>
        </Modal>
      }
    }
    return Form.create()(EditModal)
  }
