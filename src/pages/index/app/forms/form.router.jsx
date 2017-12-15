import { Route, Switch } from 'react-router-dom'

import { AdvancedForm } from './advanced-form'
import { FormPage } from './form-page'

/**
 * 二级菜单路由定义
 * match 代表上一级路由
 * @param {*match} param 
 */
export const FormRoutes = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/baseForm`} component={FormPage} />
    <Route path={`${match.url}/AdvancedForm`} component={AdvancedForm} />
  </Switch>
)