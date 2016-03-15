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
  [FIELD_CHANGE]: (state, action) => action.payload
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ''

export default function invoiceReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
