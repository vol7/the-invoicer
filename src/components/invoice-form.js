import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import update from 'react-addons-update'

import FormItemList from './form-item-list'

import { actions } from '../redux/modules/invoice'

import invoicerLogo from '../../images/invoicer-logo.svg'

const options = { year: 'numeric', month: 'long', day: 'numeric' }
const today = new Date().toLocaleDateString('en-US', options)

const initialState = {
  date: today,
  number: '',
  clientName: '',
  projectName: '',
  amountReceived: '',
  balance: '',
  location: 'Local'
}

class InvoiceForm extends Component {
  static propTypes = {
    fieldChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = initialState

    this.onChange = this.onChange.bind(this)
    this.onLoad = this.onLoad.bind(this)
    this.reset = this.reset.bind(this)

    window.onload = this.onLoad
  }

  onLoad () {
    Object.keys(this.state).map(function (key) {
      this.props.fieldChange({[key]: this.state[key]})
    }.bind(this))
  }

  onChange (event) {
    const newState = update(this.state, {
      [event.target.name]: { $set: event.target.value }
    })
    this.setState(newState)
    this.props.fieldChange({[event.target.name]: event.target.value})
  }

  reset () {
    this.setState(initialState, this.onLoad)
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
                  value={this.state.number}
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
                  value={this.state.date}
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
              value={this.state.clientName}
              onChange={this.onChange}>
            </input>
          </div>
          <div className='field'>
            <label className='field__label'>Project</label>
            <input
              className='field__input'
              type='text'
              name='projectName'
              value={this.state.projectName}
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
              value={this.state.amountReceived}
              onChange={this.onChange}
            />            
          </div>
          <div className='field'>
            <label className='field__label'>Balance Due</label>
            <input
              className='field__input'
              type='number'
              name='balance'
              value={this.state.balance}
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
              checked={this.state.location === 'Local' ? 'checked' : ''}
              onChange={this.onChange}>
            </input>
            <input
              className='field__input'
              type='radio'
              name='location'
              value='International'
              checked={this.state.location === 'International' ? 'checked' : ''}
              onChange={this.onChange}>
            </input>
          </div>
          <button type='button' onClick={this.reset} className='btn btn--primary'>Reset</button>
        </aside>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fieldChange: actions.fieldChange }, dispatch)
}

export default connect(null, mapDispatchToProps)(InvoiceForm)
