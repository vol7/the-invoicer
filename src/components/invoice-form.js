import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FormItemList from './form-item-list'
import FormInput from './form-input'

import { invoiceActions } from '../redux/modules/invoice'
import { customersActions } from '../redux/modules/customers'

import invoicerLogo from '../../images/invoicer-logo.svg'

import { initialState } from '../redux/modules/invoice'

class InvoiceForm extends Component {
  static propTypes = {
    fieldChange: PropTypes.func.isRequired,
    locationChange: PropTypes.func.isRequired,
    requestCustomers: PropTypes.func.isRequired,
    requestUploadInvoice: PropTypes.func.isRequired,
    invoice: PropTypes.object,
    customers: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onClientChange = this.onClientChange.bind(this)
    this.onLocationChange = this.onLocationChange.bind(this)
    this.reset = this.reset.bind(this)

    this.props.requestCustomers()
  }

  onChange (event) {
    this.props.fieldChange({[event.target.name]: event.target.value})
  }

  onClientChange (event) {
    const customers = this.props.customers.customers
    let foundMatch = false
    for (let i = 0; !foundMatch && i < customers.length; i++) {
      if (customers[i].id === event.target.value) {
        this.props.fieldChange({client: customers[i]})
        foundMatch = true
      }
    }
  }

  onLocationChange () {
    this.props.locationChange()
  }

  reset () {
    Object.keys(initialState).map(function (key) {
      this.props.fieldChange({[key]: initialState[key]})
    }.bind(this))
  }

  render () {
    return (
      <div>
        <aside className='sidebar'>
          <h1 className='sidebar__title'>
            <img className='icon' src={invoicerLogo}/>
            <span>Ze Invoicer</span>
          </h1>
          <div className='grid'>
            <div className='grid__col--4'>
              <FormInput
                type='number'
                name='number'
                value={this.props.invoice.number}
                label='No.'
              />
            </div>
            <div className='grid__col--8'>
              <FormInput
                type='text'
                name='date'
                value={this.props.invoice.date}
                label='Date'
              />
            </div>
          </div>

          <div className='field'>
            <label className='field__label'>Client</label>
            <select
              className='field__input'
              value={this.props.invoice.client.id}
              onChange={this.onClientChange}>
              <option value=''></option>
                {this.props.customers.customers.map(function (customer) {
                  return (
                    <option key={customer.id} value={customer.id}>{customer.name}</option>
                  )
                })}
            </select>
          </div>

          <FormInput
            type='text'
            name='projectName'
            value={this.props.invoice.projectName}
            label='Project'
          />
          <hr/>

          <FormItemList />

          <FormInput
            type='number'
            name='amountReceived'
            value={this.props.invoice.amountReceived}
            label='Paid'
          />
          <FormInput
            type='number'
            name='balance'
            value={this.props.invoice.balance}
            label='Balance Due'
          />
          <div className='field'>
            <label className='control' htmlFor='client-location'>
              <input
                className='control__input'
                type='checkbox'
                name='location'
                id='client-location'
                value='International'
                checked={this.props.invoice.international ? 'checked' : ''}
                onChange={this.onLocationChange}>
              </input>
              <span className='control__indicator control__indicator--checkbox'></span>
              <span className='control__label'>International client</span>
            </label>
          </div>
          <button type='button' onClick={this.reset} className='btn btn--primary'>Reset</button>
          <hr/>
          <button type='button' onClick={this.props.requestUploadInvoice} className='btn btn--primary'>Upload</button>
        </aside>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    invoice: state.invoice,
    customers: state.customers
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({
    fieldChange: invoiceActions.fieldChange,
    locationChange: invoiceActions.locationChange,
    requestUploadInvoice: invoiceActions.requestUploadInvoice,
    requestCustomers: customersActions.requestCustomers }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm)
