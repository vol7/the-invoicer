import React, {Component} from 'react'
import { PropTypes } from 'react'
import {connect} from 'react-redux'

class HeaderPreview extends Component {
  static propTypes = {
    invoice: PropTypes.shape({
      number: PropTypes.string,
      'client-name': PropTypes.string,
      'project-name': PropTypes.string,
      purpose: PropTypes.string,
      date: PropTypes.string,
      'amount-received': PropTypes.string,
      balance: PropTypes.string,
      'local-international': PropTypes.string
    }).isRequired
  }

  mapObject (object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key])
    })
  }

  render () {
    const invoice = this.props.invoice
    return (
      <div>
      Allo papa!
      {invoice.number}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    invoice: state.invoice
  }
}

export default connect(mapStateToProps)(HeaderPreview)
