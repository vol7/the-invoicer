import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../redux/modules/invoice'

class FormHeader extends Component {
  static propTypes = {
    fieldChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.onLoad = this.onLoad.bind(this)

    window.onload = this.onLoad
  }

  onLoad () {
    const inputs = document.querySelectorAll('.pricing-input, .header-input')
    for (var i = 0; i < inputs.length; i++) {
      this.props.fieldChange({[inputs[i].name]: inputs[i].value})
    }
  }

  onChange (event) {
    this.props.fieldChange({[event.target.name]: event.target.value})
  }

  render () {
    return (
      <div>
        <div>
          Invoice #:
          <input
            className='header-input'
            type='number'
            name='number'
            onChange={this.onChange}>
          </input>
        </div>
        <div>
        </div>
        <div>
          Date:
          <input
            className='header-input'
            type='date'
            name='date'
            defaultValue={(new Date().getFullYear()) + '-' +
            (new Date().getMonth() + 1 < 10 ? '0' + (new Date().getMonth() + 1) : new Date().getMonth() + 1) + '-' +
            (new Date().getDate() < 10 ? '0' + new Date().getDate() : new Date().getDate())}
            onChange={this.onChange}>
          </input>
        </div>
        <div>
          Client name:
          <input
            className='header-input'
            type='text'
            name='clientName'
            onChange={this.onChange}>
          </input>
        </div>
        <div>
          Project Name:
          <input
            className='header-input'
            type='text'
            name='projectName'
            onChange={this.onChange}>
          </input>
        </div>
        <div>
          Purpose:
          <input
            className='header-input'
            type='text'
            name='purpose'
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

export default connect(null, mapDispatchToProps)(FormHeader)
