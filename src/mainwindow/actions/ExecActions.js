import { UPDATE_PROCESSKEY } from './types'

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
