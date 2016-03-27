import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FormItemList from './form-item-list'
import FormInput from './form-input'

import { actions } from '../redux/modules/invoice'

import invoicerLogo from '../../images/invoicer-logo.svg'

import { initialState } from '../redux/modules/invoice'

class InvoiceForm extends Component {
  static propTypes = {
    fieldChange: PropTypes.func.isRequired,
    invoice: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.reset = this.reset.bind(this)
  }

  onChange (event) {
    this.props.fieldChange({[event.target.name]: event.target.value})
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
          <FormInput
            type='text'
            name='clientName'
            value={this.props.invoice.clientName}
            label='Client'
          />
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
                checked={this.props.invoice.location === 'International' ? 'checked' : ''}
                onChange={this.onChange}>
              </input>
              <span className='control__indicator control__indicator--checkbox'></span>
              <span className='control__label'>International?</span>
            </label>
          </div>
          <button type='button' onClick={this.reset} className='btn btn--primary'>Reset</button>
        </aside>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    invoice: state.invoice
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fieldChange: actions.fieldChange }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceForm)
