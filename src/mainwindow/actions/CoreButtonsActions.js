import { ipcRenderer } from 'electron'
import {
  LOAD_CONFIG,
  START_INST,
  CHANGE_APP_STATUS,
  APP_STATUS
} from './types'
import { instrument } from './commands'

export const loadConfig = ({ config }) => {
  return (dispatch) => {
    dispatch({ type: LOAD_CONFIG, payload: config })
    dispatch({ type: CHANGE_APP_STATUS, payload: APP_STATUS.CONFIG_LOADED })
  }
}

export const startInst = ({ classpath, ettypeList }) => {
  const command = instrument(classpath, ettypeList)
  ipcRenderer.send('send-command', command)

  return (dispatch) => {
    dispatch({ type: START_INST, payload: { classpath, ettypeList } })
    dispatch({ type: CHANGE_APP_STATUS, payload: APP_STATUS.INST_ONGOING })
  }
}
