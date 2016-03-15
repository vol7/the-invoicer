import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import invoice from './modules/invoice'

export default combineReducers({
  invoice,
  router
})
