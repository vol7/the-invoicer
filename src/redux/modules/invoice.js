// ------------------------------------
// Constants
// ------------------------------------
export const FIELD_CHANGE = 'FIELD_CHANGE'

// ------------------------------------
// Actions
// ------------------------------------
export function fieldChange (field) {
  return {
    type: FIELD_CHANGE,
    payload: field
  }
}

export const actions = {
  fieldChange
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FIELD_CHANGE]: (state, action) => ({...state, ...action.payload})
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
  location: 'Local',
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
