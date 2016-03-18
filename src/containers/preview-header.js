import React, {Component} from 'react'
import { PropTypes } from 'react'
import {connect} from 'react-redux'

const TAX = 1.1498

class HeaderPreview extends Component {
  static propTypes = {
    invoice: PropTypes.shape({
      number: PropTypes.string,
      clientName: PropTypes.string,
      projectName: PropTypes.string,
      purpose: PropTypes.string,
      date: PropTypes.string,
      amountReceived: PropTypes.string,
      balance: PropTypes.string,
      localInternational: PropTypes.string
    })
  }

  render () {
    const invoice = this.props.invoice

    const subTotal = function () {
      if (invoice.items && invoice.items.length) {
        return (invoice.items.map((item) => (parseInt(item.price)) || 0).reduce((a, b) => a + b)).toFixed(2)
      } else {
        return (0).toFixed(2)
      }
    }

    const total = function () {
      return (subTotal() * TAX).toFixed(2)
    }

    return (
      <div>
        SubTotal: {subTotal()}$ <div></div>
        Total: {total()}$ <div></div>
        Invoice number: {invoice.number} <div></div>
        Date: {invoice.date} <div></div>
        Client name: {invoice.clientName} <div></div>
        Project name: {invoice.projectName} <div></div>
        Purpose: {invoice.purpose} <div></div>
        Amount received: {invoice.amountReceived} <div></div>
        Balance: {invoice.balance} <div></div>
        Local or International: {invoice.localInternational} <div></div>
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
