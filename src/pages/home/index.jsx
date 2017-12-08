import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app/'
import { AppContainer } from '#'
window.React = React

const render = App => ReactDOM.render(<AppContainer><App /></AppContainer>, document.getElementById('app'))

render(App)

if (module.hot) {
  module.hot.accept('./app/', () => render(App))
}