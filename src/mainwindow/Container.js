/* global document */

'use strict'

import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import Reducers from './reducers'
import Window from './components/Window'

class Container extends Component {
  render () {
    const store = createStore(Reducers)
    return (
      <Provider store={store}>
        <Window />
      </Provider>
    )
  }
}

ReactDOM.render(<Container />, document.getElementById('react-container'))
