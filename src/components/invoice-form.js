import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import update from 'react-addons-update'

import FormItemList from './form-item-list'

import { actions } from '../redux/modules/invoice'

import invoicerLogo from '../../images/invoicer-logo.svg'

// import classes from 'styles/core.scss'

const today = (new Date().getFullYear()) + '-' +
      (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' +
      (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate())

const initialState = {
  // set initial state (if any) here
  date: today,
  number: '',
  clientName: '',
  projectName: '',
  purpose: '',
  amountReceived: '',
  balance: '',
  localInternational: ''
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

  mapObject (object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key])
    })
  }

  onLoad () {
    this.mapObject(this.state, function (key, value) {
      this.props.fieldChange({[key]: value})
    }.bind(this))
  }

  onChange (event) {
    let newState = update(this.state, {
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
            <span>Ze Invoicer ©</span>
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
                  type='date'
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
              type='text'
              name='amountReceived'
              value={this.state.amountReceived}
              onChange={this.onChange}>
            </input>
          </div>
          <div className='field'>
            <label className='field__label'>Balance Due</label>
            <input
              className='field__input'
              type='text'
              name='balance'
              value={this.state.balance}
              onChange={this.onChange}>
            </input>
          </div>
          <button type='button' onClick={this.reset} className='btn btn--primary'>Reset</button>
        </aside>
      </div>
    )
  }
}

/*
<div>
            Local / International:
            <input
              type='text'
              name='localInternational'
              value={this.state.localInternational}
              onChange={this.onChange}>
            </input>
          </div>
*/

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fieldChange: actions.fieldChange }, dispatch)
}

export default connect(null, mapDispatchToProps)(InvoiceForm)
