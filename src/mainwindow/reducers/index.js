import { combineReducers } from 'redux'

import ConfigReducers from './ConfigReducers'
import StatusReducers from './StatusReducers'
import MessageReducers from './MessageReducers'

export default combineReducers({
  config: ConfigReducers,
  messageList: MessageReducers,
  status: StatusReducers
})
