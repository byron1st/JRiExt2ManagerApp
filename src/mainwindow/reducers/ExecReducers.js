import _ from 'lodash'
import {
  EXEC_STATUS,
  CHANGE_ALL_EXEC_READY,
  CHANGE_EXEC_STATUS,
  UPDATE_PROCESSKEY,
  UPDATE_OUTPUTFILE
} from '../actions/types'

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_ALL_EXEC_READY:
      return state.map(exec => {
        return Object.assign({}, exec, { status: EXEC_STATUS.EXEC_READY })
      })
    case CHANGE_EXEC_STATUS:
      let newExecList1 = _.cloneDeep(state)
      newExecList1[action.payload.index].status = action.payload.execStatus
      return newExecList1
    case UPDATE_PROCESSKEY:
      let newExecList2 = _.cloneDeep(state)
      newExecList2[action.payload.index].processKey = action.payload.processKey
      return newExecList2
    case UPDATE_OUTPUTFILE:
      let newExecList3 = _.cloneDeep(state)
      newExecList3[action.payload.index].outputFile = action.payload.outputFile
      return newExecList3
    default:
      return state
  }
}
