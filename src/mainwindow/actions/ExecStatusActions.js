import {
  CHANGE_EXEC_STATUS,
  CHANGE_ALL_EXEC_READY,
  EXEC_STATUS,
  APP_STATUS
} from './types'
import { changeAppStatus } from './AppStatusActions'

export const changeExecStatusFromUniqueName = ({ uniqueName, execStatus }) => {
  return (dispatch, getState) => {
    const execList = getState().config.execList
    const index = execList.findIndex(exec => exec.uniqueName === uniqueName)
    const isAllDone = execList.reduce((accumulator, current, currentIndex) => {
      if (currentIndex === index) {
        return accumulator && execStatus === EXEC_STATUS.EXEC_DONE
      } else {
        return accumulator && current.status === EXEC_STATUS.EXEC_DONE
      }
    }, true)

    dispatch(changeExecStatus({ index, execStatus }))
    if (isAllDone) {
      dispatch(changeAppStatus({ appStatus: APP_STATUS.EXTR_READY }))
    } else {
      dispatch(changeAppStatus({ appStatus: APP_STATUS.INST_DONE }))
    }
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
