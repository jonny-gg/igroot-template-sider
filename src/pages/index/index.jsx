import './index.scss'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { AppContainer } from '#'
import '@/util/base.js'

// App 
import { App } from './App'

const render = App => ReactDOM.render(
  <AppContainer>
    <App />
  </AppContainer>,
  document.getElementById('igroot-container')
)

render(App)

if (module.hot) {
  module.hot.accept('./App', () => render(App))
}
