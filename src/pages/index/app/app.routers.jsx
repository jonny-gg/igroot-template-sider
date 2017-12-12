import { Route, Switch, Redirect } from 'react-router-dom'
import { TableRoutes } from './table/table.router'
import { ChartPage } from './chart-page/'
import { ErrorRoutes } from './error-page/error-router'
import { FormPage } from './form-page/'
import { DashboardRoutes } from './dashboard/dashboard.router'
/**
 * 路由表定义
 * 一个菜单栏定义一个容器组件
 */
export const Routes = () => (
  <Switch>
    <Route path="/dashboard" component={DashboardRoutes} />
    <Route path="/table" component={TableRoutes} />
    <Route path="/chart" component={ChartPage} />
    <Route path="/form" component={FormPage} />
    <Route path="/error" component={ErrorRoutes} />
    <Redirect from="/" to="/dashboard/analysis" />
  </Switch>
)