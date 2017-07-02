import _ from 'lodash'

import {
  EXEC_STATUS,
  LOAD_CONFIG,
  CHANGE_EXEC_STATUS,
  CHANGE_ALL_EXEC_READY,
  UPDATE_PROCESSKEY
} from '../actions/types'

const INITIAL_STATE = {
  classpath: '',
  execList: [],
  ettypeList: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_CONFIG:
      const { classpath, execList, ettypeList } = action.payload

      return Object.assign({}, state,
        {
          classpath: classpath,
          execList: execList.map(main => {
            return Object.assign({}, main, { status: EXEC_STATUS.BEFORE_READY })
          }),
          ettypeList: ettypeList
        }
      )
    case CHANGE_ALL_EXEC_READY:
      return Object.assign({}, state,
        {
          execList: state.execList.map(main => {
            return Object.assign({}, main, { status: EXEC_STATUS.EXEC_READY })
          })
        }
      )
    case CHANGE_EXEC_STATUS:
      let newExecList1 = _.cloneDeep(state.execList)
      newExecList1[action.payload.index].status = action.payload.execStatus
      return Object.assign({}, state, { execList: newExecList1 })
    case UPDATE_PROCESSKEY:
      let newExecList2 = _.cloneDeep(state.execList)
      newExecList2[action.payload.index].processKey = action.payload.processKey
      return Object.assign({}, state, { execList: newExecList2 })
    default:
      return state
  }
}
