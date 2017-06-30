import {
  GET_CONFIG
} from './types'

export const getConfig = ({ configFilePath }) => {
  return {
    type: GET_CONFIG,
    payload: configFilePath
  }
}
