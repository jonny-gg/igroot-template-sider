import { Component } from 'react';
import { Table, Card } from 'igroot'
import { treeData, tableColumns, subColumns } from '@/util/data'
/**
 * 树形表格
 */
export class TreeTablePage extends Component {
  state = {
    columns: [],  //父列表表头
    data: {}, //父列表表格数据
    expanded: false,  // 默认是否展开
    subColumns: [],  //子列表表头
    subDataSource: [],  // 子列表表格数据

    expandKeys: [],
    loading: false,
    pagination: {}
  }

  componentWillMount() {
    this.setState({ columns: tableColumns, subColumns: subColumns(), data: treeData })

  }

  /**
   * 双击打开
   */
  onDoubleClick = (record) => {
    let expandKeys = this.state.expandKeys
    if (expandKeys.some(item => item === record.key)) {
      this.onSubExpand(false, record)
    } else {
      this.onSubExpand(true, record)
    }
  }
  /**
   * 点击图标展开操作
   */
  onSubExpand = (expanded, record) => {
    let expandKeys = this.state.expandKeys
    if (expanded) {
      expandKeys.push(record.key)
      this.setState({
        expandKeys: expandKeys
      })
      const { childList } = record
      this.setState({ subDataSource: childList ? childList : [] })
    } else {
      this.setState({
        expandKeys: expandKeys.filter(item => item !== record.key)
      })
    }
  }
  /**
   * 子任务列表
   */
  expandedRowRender = (record) => {
    // const { dataSource } = this.props
    const { subDataSource, subColumns, columns } = this.state
    return (
      <Table
        rowKey={record => record.key}
        columns={subColumns}
        dataSource={record.childList}
        pagination={false}
        bordered
        scroll={{ x: 800 }}
      />
    );
  }
  render() {
    const { data, columns, pagination, loading, expandKeys } = this.state
    return (
      <div>
        <Card title="树形表格" extra={<a href="#">More</a>}>
          <Table
            rowKey={record => record.key}
            dataSource={data.list}
            columns={columns}
            pagination={false}
            loading={loading}
            onExpand={this.onSubExpand}
            onRowDoubleClick={this.onDoubleClick}
            expandedRowRender={this.expandedRowRender}
            expandedRowKeys={expandKeys}
          />
        </Card>
      </div>
    );
  }
}