import { CHANGE_APP_STATUS, APP_STATUS } from '../actions/types'

const INITIAL_STATE = APP_STATUS.READY

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_APP_STATUS:
      return action.payload
    default:
      return state
  }
}
