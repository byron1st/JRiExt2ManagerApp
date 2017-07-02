import _ from 'lodash'

import {
  LOAD_CONFIG,
  EXEC_STATUS,
  CHANGE_EXEC_STATUS,
  CHANGE_ALL_EXEC_READY
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
      console.log(action.payload)
      let newExecList = _.cloneDeep(state.execList)
      newExecList[action.payload.index].status = action.payload.execStatus
      return Object.assign({}, state, { execList: newExecList })
    default:
      return state
  }
}
