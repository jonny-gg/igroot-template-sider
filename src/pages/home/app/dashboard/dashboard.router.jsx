import { Route, Switch } from 'react-router-dom'

import { Dashboard1 } from './dashboard1/'
import { Dashboard2 } from './dashboard2/'
/**
 * 二级菜单路由定义
 * match 代表上一级路由
 * @param {*match} param 
 */
export const DashboardRoutes = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/dashboard1`} component={Dashboard1} />
    <Route path={`${match.url}/dashboard2`} component={Dashboard2} />
  </Switch>
)