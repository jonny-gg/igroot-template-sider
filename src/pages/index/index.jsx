import './index.scss'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import '@/util/base.js'

// App 
import App from './App'
import { LocaleProvider } from 'igroot'
import zh_CN from 'igroot/lib/locale-provider/zh_CN'

const render = App => ReactDOM.render(
  <LocaleProvider locale={zh_CN}>
    <App />
  </LocaleProvider>,
  document.getElementById('igroot-container')
)

render(App)

if (module.hot) {
  module.hot.accept('./App')
}
