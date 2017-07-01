import {
  LOAD_CONFIG,
  CHANGE_APP_STATUS,
  APP_STATUS
} from './types'

export const loadConfig = ({ config }) => {
  return (dispatch) => {
    dispatch({ type: LOAD_CONFIG, payload: config })
    dispatch({ type: CHANGE_APP_STATUS, payload: APP_STATUS.CONFIG_LOADED })
  }
}
