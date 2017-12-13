import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app/'
import { AppContainer } from '#'
window.React = React

const appBody = document.getElementById('app')

const render = App => ReactDOM.render(<AppContainer><App /></AppContainer>, appBody)

render(App)

if (module.hot) {
  module.hot.accept(['./app/','./../../util/data.js'], () => render(App))
}