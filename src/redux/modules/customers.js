// ------------------------------------
// Constants
// ------------------------------------
export const REQUEST_CUSTOMERS = 'REQUEST_CUSTOMERS'
export const RECEIVE_CUSTOMERS = 'RECEIVE_CUSTOMERS'

function reqAction () {
  return {
    type: REQUEST_CUSTOMERS
  }
}

// ------------------------------------
// Actions
// ------------------------------------
const requestCustomers = (REQUEST_CUSTOMERS, () => {
  return (dispatch) => {
    dispatch(reqAction())
    fetch('http://localhost:5000/customers', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((responseJson) => dispatch(receiveCustomers(responseJson)))
  }
})

const receiveCustomers = (RECEIVE_CUSTOMERS, (responseJson) => {
  const customers = responseJson.QueryResponse.Customer
  const reduxCustomers = []
  for (var customer of customers) {
    reduxCustomers.push({name: customer.FullyQualifiedName, id: customer.Id})
  }
  return {
    type: RECEIVE_CUSTOMERS,
    payload: {customers: reduxCustomers, loading: false}
  }
})

export const customersActions = {
  requestCustomers
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [REQUEST_CUSTOMERS]: (state, action) => ({...state, loading: true}),
  [RECEIVE_CUSTOMERS]: (state, action) => ({...state, ...action.payload})
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  loading: false,
  customers: [{
    name: '',
    id: ''
  }]
}

export default function invoiceReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
