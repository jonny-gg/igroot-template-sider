import { Route, Switch, Redirect } from 'react-router-dom'
import { ChartPage } from './chart-page/'
import { TableRoutes } from './table/table.router'
import { ErrorRoutes } from './error-page/error-router'
import { DashboardRoutes } from './dashboard/dashboard.router'
import { FormRoutes } from './forms/form.router'
/**
 * 路由表定义
 * 一个菜单栏定义一个容器组件
 */
export const Routes = () => (
  <Switch>
    <Route path="/dashboard" component={DashboardRoutes} />
    <Route path="/table" component={TableRoutes} />
    <Route path="/chart" component={ChartPage} />
    <Route path="/form" component={FormRoutes} />
    <Route path="/error" component={ErrorRoutes} />
    <Redirect from="/" to="/dashboard/analysis" />
  </Switch>
)