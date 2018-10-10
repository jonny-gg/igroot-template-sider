/**
 * 应用入口
 */
import React, { Component } from 'react'
import RouterConfig from 'igroot-router-config'

import { withLogin } from 'sso-login'
import { getDomain } from '@/util/function'
const domain = getDomain()
// 路由配置
import config from './routerConfig'

// 接入登录的时候取消下面这一行的注释
// @withLogin(domain)
export class App extends Component {
  render() {
    return <RouterConfig config={config} />
  }
}
