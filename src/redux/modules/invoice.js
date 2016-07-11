// ------------------------------------
// Constants
// ------------------------------------
export const FIELD_CHANGE = 'FIELD_CHANGE'
export const LOCATION_CHANGE = 'LOCATION_CHANGE'
export const MOVE_ITEM = 'MOVE_ITEM'

// ------------------------------------
// Actions
// ------------------------------------
function fieldChange (field) {
  return {
    type: FIELD_CHANGE,
    payload: field
  }
}

function locationChange (field) {
  return {
    type: LOCATION_CHANGE
  }
}

function moveItem (fromIndex, toIndex) {
  return {
    type: MOVE_ITEM,
    payload: {
      fromIndex: fromIndex,
      toIndex: toIndex
    }
  }
}

export const invoiceActions = {
  fieldChange,
  locationChange,
  moveItem
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FIELD_CHANGE]: (state, action) => ({...state, ...action.payload}),
  [LOCATION_CHANGE]: (state) => ({...state, international: !state.international}),
  [MOVE_ITEM]: (state, action) => (moveItemFunction(state, action))
}

function moveItemFunction (state, action) {
  let newItems = state.items
  newItems.splice(action.payload.toIndex, 0, newItems.splice(action.payload.fromIndex, 1)[0])
  return {...state, items: newItems}
}

// ------------------------------------
// Reducer
// ------------------------------------
const options = { year: 'numeric', month: 'long', day: 'numeric' }
const today = new Date().toLocaleDateString('en-US', options)
export const initialState = {
  date: today,
  number: '',
  client: '',
  projectName: '',
  amountReceived: '',
  paid: '',
  paymentDue: '',
  international: false,
  items: [{
    description: '',
    price: null,
    name: ''
  }],
  uploading: false,
  showUploadedPrompt: false
}

export default function invoiceReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
