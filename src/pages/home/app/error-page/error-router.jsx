import { Route, Switch } from 'react-router-dom'

import { Page404 } from './page404'
import { Page500 } from './page500'
import { Page403 } from './page403'
/**
 * 二级菜单路由定义
 * match 代表上一级路由
 * @param {*match} param 
 */
export const ErrorRoutes = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/404`} component={Page404} />
    <Route path={`${match.url}/500`} component={Page500} />
    <Route path={`${match.url}/403`} component={Page403} />
  </Switch>
)