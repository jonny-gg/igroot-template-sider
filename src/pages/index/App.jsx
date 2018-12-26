/**
 * 应用入口
 */
import React, { Component } from 'react'
import RouterConfig from 'igroot-router-config'

import { withLogin } from 'sso-login'
import { getDomain } from '@/util/function'
import { hot } from '#'
const domain = getDomain()
// 路由配置
import config from './routerConfig'

// 接入登录的时候取消下面这一行的注释
@hot(module)
// @withLogin(domain)
class App extends Component {
  render() {
    return <RouterConfig config={config} />
  }
}
export default App
