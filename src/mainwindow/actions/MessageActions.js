import { APPEND_MESSAGE, CLEAR_MESSAGE } from './types'

export const appendMessage = (message) => {
  return {
    type: APPEND_MESSAGE,
    payload: message
  }
}

export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE
  }
}
