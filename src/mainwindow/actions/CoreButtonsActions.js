import { ipcRenderer } from 'electron'
import {
  LOAD_CONFIG,
  START_INST,
  APP_STATUS
} from './types'
import { instrument } from './commands'
import { changeAppStatus } from './AppStatusActions'

export const loadConfig = ({ config }) => {
  return (dispatch) => {
    dispatch({ type: LOAD_CONFIG, payload: config })
    dispatch(changeAppStatus({ appStatus: APP_STATUS.CONFIG_LOADED }))
  }
}

export const startInst = ({ classpath, ettypeList }) => {
  const command = instrument(classpath, ettypeList)
  ipcRenderer.send('send-command', command)

  return (dispatch) => {
    dispatch({ type: START_INST, payload: { classpath, ettypeList } })
    dispatch(changeAppStatus({ appStatus: APP_STATUS.INST_ONGOING }))
  }
}
