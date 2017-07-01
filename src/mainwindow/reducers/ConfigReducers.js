import _ from 'lodash'

import {
  LOAD_CONFIG,
  MAIN_STATUS,
  CHANGE_MAIN_STATUS,
  CHANGE_ALL_MAIN_READY
} from '../actions/types'

const INITIAL_STATE = {
  classpath: '',
  mainList: [],
  ettypeList: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_CONFIG:
      const { classpath, mainList, ettypeList } = action.payload

      return Object.assign({}, state,
        {
          classpath: classpath,
          mainList: mainList.map(main => {
            return Object.assign({}, main, { status: MAIN_STATUS.BEFORE_READY })
          }),
          ettypeList: ettypeList
        }
      )
    case CHANGE_ALL_MAIN_READY:
      return Object.assign({}, state,
        {
          mainList: state.mainList.map(main => {
            return Object.assign({}, main, { status: MAIN_STATUS.EXEC_READY })
          })
        }
      )
    case CHANGE_MAIN_STATUS:
      let newMainList = _.cloneDeep(state.mainList)
      newMainList[action.payload.index].status = action.payload.mainStatus
      return Object.assign({}, state, { mainList: newMainList })
    default:
      return state
  }
}
