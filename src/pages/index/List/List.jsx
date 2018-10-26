import React, { Component } from 'react'
import { Card, Row, Col, Tooltip, Icon, message, Modal } from 'igroot'
import { TablePage } from './../../../components/TablePage'
import { getItemList, deleteItem } from '@/api/list'
import { DemoFilter } from './Filter'
import { DemoModal } from './Modal'

/**
 * 探测管理
 */
const { confirm } = Modal

export class DemoList extends Component {
  state = {
    columns: [
      { title: 'id', dataIndex: 'id', key: 'id', },
      { title: '名称', dataIndex: 'name', key: 'name', },
      { title: '运营商', dataIndex: 'isp_id', key: 'isp_id', },
      { title: '省份', dataIndex: 'province_id', key: 'province_id', },
      { title: '状态', dataIndex: 'status', key: 'status', },
      { title: '创建时间', dataIndex: 'created_at', key: 'created_at', },
      { title: '修改时间', dataIndex: 'updated_at', key: 'updated_at', },
      {
        title: '操作', dataIndex: 'op', key: 'op',
        render: (text, record) => this.operation(record)
      },
    ],
    tableData: [],
    loading: false,
  }

  componentWillMount() {
    this.getData()
  }

  operation = record => {
    return <div>
      <Tooltip title="编辑">
        <a onClick={() => this.updateItem(record)}><Icon type="edit" className="icon_cust" /></a> &nbsp;&nbsp;&nbsp;
      </Tooltip>
      &nbsp;&nbsp;&nbsp;
      <Tooltip title="删除">
        <a onClick={() => this.showDeleteConfirm(record)}><Icon type="delete" className="icon_cust" /></a>
      </Tooltip>
    </div>
  }

  // 点击打开新增窗口
  addItem = () => {
    this.modal.show()
  }

  // 点击打开编辑窗口
  updateItem = record => {
    this.modal.show(record)
  }

  // 删除提示确认操作
  showDeleteConfirm = (record) => {
    confirm({
      title: '删除操作提示',
      content: '您确定要删除此条数据吗？',
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk: () => this.deleteItem(record),
      onCancel() {
      },
    })
  }

  // 删除操作
  deleteItem = (record) => {
    deleteItem(record.id).then(data => {
      message.success('成功删除')
      this.getData()
    }).catch(error => {
      message.error('删除操作异常')
    })
  }

  // 查询操作
  getData = (value = {}) => {
    value = value || this.state.filter
    this.setState({ filter: value })
    const {
      current_num,
      current_page
    } = value.pages || { current_num: 10, current_page: 1 }

    const vars = {
      ...value,
      pages: { current_num, current_page }
    }

    this.setState({ loading: true }, () => {
      getItemList(vars).then(res => {
        this.setState({
          tableData: res,
          loading: false,
          pages: {
            // total: parseInt(data.pagination['x-pagination-total-count'], 0),
            current_num,
            current_page
          },
        })
      }).catch((error) => {
        this.setState({ loading: false })
      })
    })
  }

  // 点击分页时候的查询
  getPage = ({ pages }) => {
    this.getData({ ...this.state.filter, pages })
  }

  // 点击查询按钮时
  handleSubmit = (value) => {
    this.getData(value)
  }

  render() {
    const { columns, tableData, loading, pages } = this.state
    return (
      <div>
        {console.log(tableData)}
        <Card title="列表展示">
          <DemoFilter onSubmit={this.handleSubmit} addItem={this.addItem} />
          <Row gutter={16}>
            <Col span={24} >
              <TablePage
                rowKey="id"
                columns={columns}
                dataSource={tableData}
                loading={loading}
                pages={pages}
                search={this.getPage}
              />
            </Col>
          </Row>
          <DemoModal
            init={modal => this.modal = modal}
            title="模态框标题"
            refresh={this.getData}
          />
        </Card>
      </div>
    )
  }
}
