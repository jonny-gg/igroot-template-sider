import React from 'react'
import ReactDOM from 'react-dom'

import { App } from './app/'
import { AppContainer } from '#'
import { Fetch } from 'igroot-fetch'
Fetch.setDomain({
  /**
   * [API 请求地址]: [匹配访问地址的正则]
   * 
   * 例如：'http://test.abc.baishancloud.com:2333': /test\.abc\.baishancloud\.com/
   * 意味着当访问的地址中包含字符 'test.abc.baishancloud.com' 时，
   * 将会使用 'http://test.abc.baishancloud.com:2333' 作为 API 请求的地址
   */
  'http://test.i.qingcdn.com:86': /localhost|test\.i\.qingcdn\.com\:8888/,
})
window.Client = Fetch('/graphql')
window.Fetch = Fetch
window.React = React

const appBody = document.getElementById('app')

const render = App => ReactDOM.render(<AppContainer><App /></AppContainer>, appBody)

render(App)

if (module.hot) {
  module.hot.accept(['./app/', './../../util/data.js'], () => render(App))
}