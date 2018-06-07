import './index.scss'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Login from 'sso-login'
import { AppContainer } from '#'
import '@/util/base.js'

// App 
import { App } from './App'

import { getDomain } from '@/util/function'
const domain = getDomain()

// 接入登录的时候使用
// const render = App => ReactDOM.render(
//   <Login apiDomain={domain}>
//     <AppContainer>
//       <App />
//     </AppContainer>
//   </Login>,
//   document.getElementById('igroot-container')
// )

const render = App => ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('igroot-container')
)

render(App)

if (module.hot) {
  module.hot.accept('./App', window.location.reload())
}

