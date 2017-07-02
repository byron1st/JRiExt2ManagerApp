import {
  CHANGE_EXEC_STATUS,
  CHANGE_ALL_EXEC_READY
} from './types'

export const changeExecStatus = ({ index, execStatus }) => {
  return {
    type: CHANGE_EXEC_STATUS,
    payload: { index, execStatus }
  }
}

export const changeAllExecReady = () => {
  return {
    type: CHANGE_ALL_EXEC_READY
  }
}
