import { ipcRenderer } from 'electron'

import {
  LOAD_CONFIG,
  APP_STATUS,
  ADD_CACHEROOT
} from './types'
import { instrument } from './commands'
import { changeAppStatus } from './AppStatusActions'
import { appendMessage } from './MessageActions'

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
    dispatch(changeAppStatus({ appStatus: APP_STATUS.INST_ONGOING }))
    dispatch(appendMessage('Instrumentation has been started.'))
  }
}

export const addCacheRoot = (cacheRoot) => {
  return {
    type: ADD_CACHEROOT,
    payload: cacheRoot
  }
}
