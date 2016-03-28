// ------------------------------------
// Constants
// ------------------------------------
export const FIELD_CHANGE = 'FIELD_CHANGE'
export const LOCATION_CHANGE = 'LOCATION_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function fieldChange (field) {
  return {
    type: FIELD_CHANGE,
    payload: field
  }
}

export function locationChange (field) {
  return {
    type: LOCATION_CHANGE
  }
}

export const actions = {
  fieldChange,
  locationChange
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FIELD_CHANGE]: (state, action) => ({...state, ...action.payload}),
  [LOCATION_CHANGE]: (state) => ({...state, international: !state.international})
}

// ------------------------------------
// Reducer
// ------------------------------------
const options = { year: 'numeric', month: 'long', day: 'numeric' }
const today = new Date().toLocaleDateString('en-US', options)
export const initialState = {
  date: today,
  number: '',
  clientName: '',
  projectName: '',
  amountReceived: '',
  balance: '',
  international: false,
  items: [{
    description: '',
    price: null,
    name: ''
  }]
}

export default function invoiceReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
