/**
 * 应用入口
 */
import React, { Component } from 'react'
import RouterConfig from 'igroot-router-config'

import { hot } from '#'

import { withLogin } from 'sso-login'
import { getDomain } from '@/util/function'

// 路由配置
import config from './routerConfig'

const domain = getDomain()

@hot(module) // 接入登录的时候取消下面这一行的注释
// @withLogin(domain)
class App extends Component {
  render() {
    return <RouterConfig config={config} />
  }
}
export default App
