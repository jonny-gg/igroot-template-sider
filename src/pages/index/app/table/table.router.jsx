import { Route, Switch } from 'react-router-dom'

import { TableList } from './search-page'
import { TreeTablePage } from './tree-table-page'
/**
 * 二级菜单路由定义
 * match 代表上一级路由
 * @param {*match} param 
 */
export const TableRoutes = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/list`} component={TableList} />
    <Route path={`${match.url}/treeTable`} component={TreeTablePage} />
  </Switch>
)