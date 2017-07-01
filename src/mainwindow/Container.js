/* global document */

'use strict'

import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import Reducers from './reducers'
import Window from './components/Window'

class Container extends Component {
  render () {
    const store = createStore(Reducers, applyMiddleware(thunk))
    return (
      <Provider store={store}>
        <Window />
      </Provider>
    )
  }
}

ReactDOM.render(<Container />, document.getElementById('react-container'))
