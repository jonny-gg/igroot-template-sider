/**
 * 应用入口
 */
import React, { Component } from 'react'
import RouterConfig from 'igroot-router-config'

// 路由配置
import config from './routerConfig'

export class App extends Component {
  render() {
    return <RouterConfig config={config} />
  }
}