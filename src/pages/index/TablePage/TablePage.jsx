import React, { PureComponent } from 'react'
import { Card } from 'igroot'
import { Search } from './Search'
import { List } from './List/'
import TablePage from '@/components/HocTablePage'
import { querySupplierPage } from '@/api/list'
@TablePage({
  // 默认搜索参数 默认 {}
  defaultParams: {},
  // 是否前端受控分页 默认 true
  pagination: true,
  // 默认页码  默认 { current_page: 1, page_size: 30 }
  defaultPageInfo: { current_page: 1, page_size: 30 },
  // 列表请求函数
  queryData: (params, pageInfo, state, cb) => {
    querySupplierPage({ ...params, ...pageInfo }).then(res => {
      if (res) {
        cb(
          {
            // dataSource: res.data.supplierPage.supplier_list,
            dataSource: res,
            total: res.total || 10
          }
        )
      } else {
        cb(false)
      }
    })
  }
})
export class TableHocPage extends PureComponent {
  render() {
    return (
      <Card bodyStyle={{ padding: 10 }} >
        <Search />
        <List />
      </Card>
    )
  }
}

