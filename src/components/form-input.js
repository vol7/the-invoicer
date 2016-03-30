import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { invoiceActions } from '../redux/modules/invoice'

class FormInput extends Component {
  static propTypes = {
    fieldChange: PropTypes.func,
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.node
  }

  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.props.fieldChange({[event.target.name]: event.target.value})
  }

  render () {
    return (
      <div className='field'>
        <label className='field__label'>{this.props.label}</label>
        <input
          className='field__input'
          type={this.props.type}
          name={this.props.name}
          value={this.props.value}
          onChange={this.onChange}
        />
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fieldChange: invoiceActions.fieldChange }, dispatch)
}

export default connect(null, mapDispatchToProps)(FormInput)
