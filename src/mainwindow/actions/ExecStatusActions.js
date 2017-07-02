import {
  CHANGE_EXEC_STATUS,
  CHANGE_ALL_EXEC_READY
} from './types'

export const changeExecStatusFromUniqueName = ({ uniqueName, execStatus }) => {
  return (dispatch, getState) => {
    const execList = getState().config.execList
    const index = execList.findIndex(exec => exec.uniqueName === uniqueName)

    dispatch(changeExecStatus({ index, execStatus }))
  }
}

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
