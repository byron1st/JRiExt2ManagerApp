export const LOAD_CONFIG = 'load-config'
export const ADD_CACHEROOT = 'add-cacheroot'

// Change the app status
export const CHANGE_APP_STATUS = 'change-app-status'
export const APP_STATUS = {
  READY: 0,
  CONFIG_LOADED: 1,
  INST_ONGOING: 2,
  INST_DONE: 3,
  EXTR_READY: 4,
  EXTR_DONE: 5
}

// Change the status of a exec
export const CHANGE_EXEC_STATUS = 'change-exec-status'
export const CHANGE_ALL_EXEC_READY = 'change-all-exec-ready'
export const EXEC_STATUS = {
  BEFORE_READY: 0,
  EXEC_READY: 1,
  EXEC_ONGOING: 2,
  EXEC_DONE: 3
}

// Exec actions
export const UPDATE_PROCESSKEY = 'update-processkey'
export const UPDATE_OUTPUTFILE = 'update-outputfile'

// Message actions
export const APPEND_MESSAGE = 'append-message'
export const CLEAR_MESSAGE = 'clear-message'
