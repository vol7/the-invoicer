import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FormItemList from './form-item-list'

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
            <span><i>Ze Invoicer</i> ©</span>
          </h1>
          <div className='grid'>
            <div className='grid__col--4'>
              <div className='field'>
                <label className='field__label'>No.</label>
                <input
                  className='field__input'
                  type='number'
                  name='number'
                  value={this.props.invoice.number}
                  onChange={this.onChange}>
                </input>
              </div>
            </div>
            <div className='grid__col--8'>
              <div className='field'>
                <label className='field__label'>Date</label>
                <input
                  className='field__input'
                  type='string'
                  name='date'
                  value={this.props.invoice.date}
                  onChange={this.onChange}>
                </input>
              </div>
            </div>
          </div>
          <div className='field'>
            <label className='field__label'>Client</label>
            <input
              className='field__input'
              type='text'
              name='clientName'
              value={this.props.invoice.clientName}
              onChange={this.onChange}>
            </input>
          </div>
          <div className='field'>
            <label className='field__label'>Project</label>
            <input
              className='field__input'
              type='text'
              name='projectName'
              value={this.props.invoice.projectName}
              onChange={this.onChange}>
            </input>
          </div>
          <hr/>

          <FormItemList />

          <div className='field'>
            <label className='field__label'>Paid</label>
            <input
              className='field__input'
              type='number'
              name='amountReceived'
              value={this.props.invoice.amountReceived}
              onChange={this.onChange}
            />
          </div>
          <div className='field'>
            <label className='field__label'>Balance Due</label>
            <input
              className='field__input'
              type='number'
              name='balance'
              value={this.props.invoice.balance}
              onChange={this.onChange}>
            </input>

          </div>
          <div className='field'>
            <label className='field__label'>Location</label>
            <input
              className='field__input'
              type='radio'
              name='location'
              value='Local'
              checked={this.props.invoice.location === 'Local' ? 'checked' : ''}
              onChange={this.onChange}>
            </input>
            <input
              className='field__input'
              type='radio'
              name='location'
              value='International'
              checked={this.props.invoice.location === 'International' ? 'checked' : ''}
              onChange={this.onChange}>
            </input>
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
