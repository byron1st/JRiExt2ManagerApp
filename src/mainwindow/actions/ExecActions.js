import { UPDATE_PROCESSKEY, UPDATE_OUTPUTFILE } from './types'

export const updateProcessKey = ({ uniqueName, processKey }) => {
  return (dispatch, getState) => {
    const execList = getState().config.execList
    const index = execList.findIndex(exec => exec.uniqueName === uniqueName)

    dispatch({
      type: UPDATE_PROCESSKEY,
      payload: { index, processKey }
    })
  }
}

export const updateOutputFile = ({ uniqueName, outputFile }) => {
  return (dispatch, getState) => {
    const execList = getState().config.execList
    const index = execList.findIndex(exec => exec.uniqueName === uniqueName)

    dispatch({
      type: UPDATE_OUTPUTFILE,
      payload: { index, outputFile }
    })
  }
}
