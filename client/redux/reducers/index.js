import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import shop from './shop'
import logs from './logs'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    shop,
    logs
  })

export default createRootReducer
