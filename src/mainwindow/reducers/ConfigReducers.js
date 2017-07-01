import {
  LOAD_CONFIG
} from '../actions/types'

const INITIAL_STATE = {
  classpath: '',
  mainList: [],
  ettypeList: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_CONFIG:
      const config = action.payload
      return Object.assign({}, state,
        {
          classpath: config.classpath,
          mainList: config.mainList,
          ettypeList: config.ettypeList
        }
      )
    default:
      return state
  }
}
