import { CHANGE_APP_STATUS } from './types'

export const changeAppStatus = ({ appStatus }) => {
  return {
    type: CHANGE_APP_STATUS,
    payload: appStatus
  }
}
