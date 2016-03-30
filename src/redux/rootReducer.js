import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import invoice from './modules/invoice'
import customers from './modules/customers'

export default combineReducers({
  invoice,
  customers,
  router
})
