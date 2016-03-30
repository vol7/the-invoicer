// ------------------------------------
// Constants
// ------------------------------------
export const FIELD_CHANGE = 'FIELD_CHANGE'
export const LOCATION_CHANGE = 'LOCATION_CHANGE'
export const REQUEST_UPLOAD_INVOICE = 'REQUEST_UPLOAD_INVOICE'
export const RECEIVE_UPLOAD_INVOICE = 'RECEIVE_UPLOAD_INVOICE'

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

function reqAction () {
  return {
    type: REQUEST_UPLOAD_INVOICE
  }
}

function buildUploadBody (state) {
  let lines = []
  state.invoice.items.map(function (item) {
    let description = `${item.name}: ${item.description}`
    lines.push({
      Description: description,
      Amount: item.price,
      DetailType: 'SalesItemLineDetail',
      SalesItemLineDetail: {
        ItemRef: {
          value: '1'
        }
      }
    })
  })
  let customerRef = {
    value: state.invoice.client.id
  }
  return {Line: lines, CustomerRef: customerRef}
}

const requestUploadInvoice = (REQUEST_UPLOAD_INVOICE, () => {
  return (dispatch, state) => {
    dispatch(reqAction())
    const body = buildUploadBody(state())
    fetch('http://localhost:5000/invoice', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    }).then(() => dispatch(receiveUploadInvoice()))
  }
})

const receiveUploadInvoice = (RECEIVE_UPLOAD_INVOICE, () => {
  return {
    type: RECEIVE_UPLOAD_INVOICE
  }
})

export const invoiceActions = {
  fieldChange,
  locationChange,
  requestUploadInvoice
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [FIELD_CHANGE]: (state, action) => ({...state, ...action.payload}),
  [LOCATION_CHANGE]: (state) => ({...state, international: !state.international}),
  [REQUEST_UPLOAD_INVOICE]: (state) => (state),
  [RECEIVE_UPLOAD_INVOICE]: (state) => (state)
}

// ------------------------------------
// Reducer
// ------------------------------------
const options = { year: 'numeric', month: 'long', day: 'numeric' }
const today = new Date().toLocaleDateString('en-US', options)
export const initialState = {
  date: today,
  number: '',
  client: {
    name: '',
    id: ''
  },
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
