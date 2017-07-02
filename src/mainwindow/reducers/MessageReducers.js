import _ from 'lodash'

import { APPEND_MESSAGE, CLEAR_MESSAGE } from '../actions/types'

const INITIAL_STATE = ['0 :: JRiExt2 Manager App has been started.']

let count = 1

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case APPEND_MESSAGE:
      let newMessageList = _.clone(state)
      let newMessage = (count++) + ' :: ' + action.payload
      newMessageList.unshift(newMessage)

      return newMessageList
    case CLEAR_MESSAGE:
      count = 0
      return []
    default:
      return state
  }
}
