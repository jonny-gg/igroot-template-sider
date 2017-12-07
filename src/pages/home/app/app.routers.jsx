import { Route, Switch, Redirect } from 'react-router-dom'
import { TableList } from './search-page/'
import { ChartPage } from './chart-page/'
import { ErrorPage } from './error-page/'
import { FormPage } from './form-page/'
import { DashboardRoutes } from './dashboard/dashboard.router'
/**
 * 路由表定义
 * 一个菜单栏定义一个容器组件
 */
export const Routes = () => (
  <Switch>
    <Route path="/dashboard" component={DashboardRoutes} />
    <Route path="/list" component={TableList} />
    <Route path="/chart" component={ChartPage} />
    <Route path="/form" component={FormPage} />
    <Route path="/error" component={ErrorPage} />
    <Redirect from="/" to="/list" />
  </Switch>
)