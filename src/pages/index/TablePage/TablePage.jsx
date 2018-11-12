import React, { PureComponent } from 'react'
import { Card } from 'igroot'
import { Search } from './Search'
import { List } from './List/'
import TablePage from '@/components/TablePage/'
import { querySupplierPage } from '@/apis/supplier/supplierPage'
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
            dataSource: res.data.supplierPage.supplier_list,
            total: res.data.supplierPage.pagination.total
          }
        )
      } else {
        cb(false)
      }
    })
  }
})
export class TablePage extends PureComponent {
  render() {
    return (
      <Card bodyStyle={{ padding: 10 }} >
        <Search />
        <List />
      </Card>
    )
  }
}

