import {
  CHANGE_MAIN_STATUS,
  CHANGE_ALL_MAIN_READY
} from './types'

export const changeMainStatus = ({ index, mainStatus }) => {
  return {
    type: CHANGE_MAIN_STATUS,
    payload: { index, mainStatus }
  }
}

export const changeAllMainReady = () => {
  return {
    type: CHANGE_ALL_MAIN_READY
  }
}
