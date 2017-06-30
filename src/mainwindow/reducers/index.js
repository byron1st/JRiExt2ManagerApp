import { combineReducers } from 'redux'

import ConfigReducers from './ConfigReducers'

export default combineReducers({
  config: ConfigReducers,
  messageList: () => { return '' },
  status: () => { return '' }
})
