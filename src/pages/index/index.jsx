import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app/'

import Login from 'sso-login'
import domain from '@/util/domain'

window.React = React
// 用 Login 组件包裹你的项目组件即可，这里我用了应付的后端地址来做sso登录，如果要改可以在@/util/domain文件中修改
const render = App => ReactDOM.render(
  <Login apiDomain={domain}>
    <App />
  </Login >,
  document.getElementById('app')
)

render(App)

if (module.hot) {
  module.hot.accept(['./app/', './../../util/data.js'], () => render(App))
}
