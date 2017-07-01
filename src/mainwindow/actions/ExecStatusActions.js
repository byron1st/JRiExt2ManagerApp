import {
  CHANGE_EXEC_STATUS,
  CHANGE_ALL_EXEC_READY
} from './types'

export const changeExecStatus = ({ index, mainStatus }) => {
  return {
    type: CHANGE_EXEC_STATUS,
    payload: { index, mainStatus }
  }
}

export const changeAllExecReady = () => {
  return {
    type: CHANGE_ALL_EXEC_READY
  }
}
