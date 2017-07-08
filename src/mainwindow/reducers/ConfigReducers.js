import ExecReducers from './ExecReducers'
import {
  EXEC_STATUS,
  LOAD_CONFIG,
  CHANGE_EXEC_STATUS,
  CHANGE_ALL_EXEC_READY,
  UPDATE_PROCESSKEY,
  UPDATE_OUTPUTFILE,
  ADD_CACHEROOT
} from '../actions/types'

const INITIAL_STATE = {
  classpath: '',
  mappingConditionScript: '',
  execList: [],
  ettypeList: [],
  cacheRoot: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_CONFIG:
      const { classpath, execList, ettypeList, mappingConditionScript } = action.payload

      return Object.assign({}, state,
        {
          classpath: classpath,
          execList: execList.map(main => {
            return Object.assign({}, main, { status: EXEC_STATUS.BEFORE_READY })
          }),
          ettypeList: ettypeList,
          mappingConditionScript: mappingConditionScript
        }
      )
    case ADD_CACHEROOT:
      return Object.assign({}, state, { cacheRoot: action.payload })
    case CHANGE_ALL_EXEC_READY:
    case CHANGE_EXEC_STATUS:
    case UPDATE_PROCESSKEY:
    case UPDATE_OUTPUTFILE:
      return Object.assign({}, state, {
        execList: ExecReducers(state.execList, action)
      })
    default:
      return state
  }
}
