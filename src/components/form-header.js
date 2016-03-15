import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actions } from '../redux/modules/invoice'

class FormHeader extends Component {
  static propTypes = {
    fieldChange: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.onChange = this.onChange.bind(this)
  }

  onChange (event) {
    this.props.fieldChange(event.target.value)
  }

  render () {
    return (
      <div>
        <div>
          Invoice #:
          <input
            type='text'
            name='invoice-number'
            onChange={this.onChange}>
          </input>
        </div>
        <div>
          Date:
          <input type='date' name='date'></input>
        </div>
        <div>
          Client name:
          <input type='text' name='client-name'></input>
        </div>
        <div>
          Project Name:
          <input type='text' name='project-name'></input>
        </div>
        <div>
          Purpose:
          <input type='text' name='purpose'></input>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fieldChange: actions.fieldChange }, dispatch)
}

export default connect(null, mapDispatchToProps)(FormHeader)
