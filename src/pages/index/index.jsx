import './index.scss'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Login from 'sso-login'
import { getDomain } from '@/util/function'

// App 
import { App } from './App'

const IGROOT_CONTAINER = document.getElementById('igroot-container')
const domain = getDomain()

if (!IGROOT_CONTAINER) {
  throw new Error('当前页面不存在 <div id="igroot-container"></div> 节点.')
}

// 接入登录的时候使用
// {/* <Login apiDomain={domain}>
//   <App />
// </Login> */}

ReactDOM.render(
  <App />, 
IGROOT_CONTAINER)

