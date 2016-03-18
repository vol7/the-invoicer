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
    })
  }

  render () {
    const invoice = this.props.invoice

    const total = function () {
      if (invoice.items && invoice.items.length) {
        return invoice.items.map((item) => (parseInt(item.price)) || 0).reduce((a, b) => a + b)
      } else {
        return 0
      }
    }

    return (
      <div>
        Total: {total()}$
        <div></div>
        Invoice #: {invoice.number}
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
