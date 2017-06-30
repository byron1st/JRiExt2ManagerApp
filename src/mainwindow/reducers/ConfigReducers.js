import fs from 'fs'
import { remote } from 'electron'
import {
  GET_CONFIG
} from '../actions/types'

const INITIAL_STATE = {
  classpath: '',
  mainList: [],
  ettypeList: []
}

const checkValidation = (config) => {
  return config.classpath && config.mainList && config.ettypeList &&
    Array.isArray(config.mainList) && Array.isArray(config.ettypeList) && typeof config.classpath === 'string'
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CONFIG:
      try {
        const config = JSON.parse(fs.readFileSync(action.payload))
        if (!checkValidation(config)) {
          throw new Error('The format of a config file is wrong.')
        }

        return Object.assign({}, state,
          {
            classpath: config.classpath,
            mainList: config.mainList,
            ettypeList: config.ettypeList
          }
        )
      } catch (e) {
        remote.dialog.showErrorBox('Error!!', e.message)
        return state
      }
    default:
      return state
  }
}
