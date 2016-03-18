import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../redux/modules/invoice'

class FormPricing extends Component {
  static propTypes = {
    fieldChange: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.props.fieldChange({[event.target.name]: event.target.value})
  }

  render () {
    return (
      <div>
        <div>
          Amount Received:
          <input
            className='pricing-input'
            type='text'
            name='amountReceived'
            onChange={this.onChange}>
          </input>
        </div>
        <div>
          Balance Due:
          <input
            className='pricing-input'
            type='text'
            name='balance'
            onChange={this.onChange}>
          </input>
        </div>
        <div>
          Local / International:
          <input
            className='pricing-input'
            type='text'
            name='localInternational'
            onChange={this.onChange}>
          </input>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fieldChange: actions.fieldChange }, dispatch)
}

export default connect(null, mapDispatchToProps)(FormPricing)
