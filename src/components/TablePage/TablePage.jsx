import React, { PureComponent } from 'react'
import { Table } from 'igroot'
/**
 * 通用型表格组件
 * 默认分页
 */
export class TablePage extends PureComponent {
  getPageConfig = () => {
    const { pages = {} } = this.props
    return {
      total: pages.total ? pages.total : 0,
      showTotal: total => `总条数 ${pages.total ? pages.total : 0} 条`,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '30', '50', '100', '200'],
      onChange: (page, size) => this.props.search({ pages: { current_page: page, current_num: size } }),
      onShowSizeChange: (page, size) => this.props.search({ pages: { current_page: page, current_num: size } })
    }
  }

  render() {
    const { columns = [], rowSelection = null, dataSource = [], rowKey = 'id', loading, scrollConfig = {}, size = 'default' } = this.props
    console.log(dataSource)
    return (
      <div id="tablePage">
        <Table
          rowKey={rowKey}
          dataSource={dataSource}
          columns={columns}
          size={size}
          pagination={this.getPageConfig()}
          loading={loading}
          bordered
          scroll={scrollConfig}
          rowSelection={rowSelection}
          locale={{ emptyText: '数据为空' }}
        />
      </div>
    )
  }
}