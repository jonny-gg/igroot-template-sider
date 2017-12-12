import { Route, Switch } from 'react-router-dom'

import { Analysis } from './analysis'
import { Monitor } from './monitor'
/**
 * 二级菜单路由定义
 * match 代表上一级路由
 * @param {*match} param 
 */
export const DashboardRoutes = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/analysis`} component={Analysis} />
    <Route path={`${match.url}/monitor`} component={Monitor} />
  </Switch>
)