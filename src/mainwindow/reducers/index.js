import { combineReducers } from 'redux'

import ConfigReducers from './ConfigReducers'
import StatusReducers from './StatusReducers'

export default combineReducers({
  config: ConfigReducers,
  messageList: () => { return '' },
  status: StatusReducers
})
