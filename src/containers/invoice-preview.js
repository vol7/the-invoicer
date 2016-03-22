import React, { Component } from 'react'
import { PropTypes } from 'react'
import { connect } from 'react-redux'

import logo from '../../images/logo.svg'
import logoMuted from '../../images/logo-muted.svg'

import 'styles/core.scss'

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

  mapObject (object, callback) {
    return Object.keys(object).map(function (key) {
      return callback(key, object[key])
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
      return (subTotal() * (1 + TVQ + TPS)).toFixed(2)
    }

    const tvq = function () {
      return (subTotal() * (TVQ)).toFixed(2)
    }

    const tps = function () {
      return (subTotal() * (TPS)).toFixed(2)
    }

    const taxes = function () {
      return (subTotal() * (TPS + TVQ)).toFixed(2)
    }

    let amountReceived = ''
    if (invoice.amountReceived) {
      amountReceived = (
        <div className='grid__col--3'>
          <h4>Paid</h4>
          <strong>{parseInt(invoice.amountReceived).toFixed(2)}$</strong>
        </div>
      )
    }

    return (
      <div className='site-wrap'>
        <header className='header'>
          <div className='grid grid--middle'>
            <div className='grid__col--3'><img src={logo} style={{width: '46px'}}/></div>
            <div className='grid__col--3'><strong>Volume7 Inc.</strong></div>
            <div className='grid__col--6 text-right'><strong>94 Champlain, Montreal, QC H8Y 3S5</strong></div>
          </div>
        </header>
        <section className='section'>
          <div className='grid'>
            <div className='grid__col--3'>
              <h4>Invoice</h4>
              <strong>{invoice.number}</strong>
            </div>

            <div className='grid__col--3'>
              <h4>Client</h4>
              <strong>{invoice.clientName}</strong>
            </div>

            <div className='grid__col--3'>
              <h4>Project</h4>
              <strong>{invoice.projectName}</strong>
            </div>

            <div className='grid__col--3 text-right'>
              <h4>Date</h4>
              <strong>{invoice.date}</strong>
            </div>

          </div>
        </section>

        <hr/>

        <section className='section' style={{minHeight: '220px'}}>
        {this.mapObject(invoice.items, function (key, value) {
          return (
            <div className='grid item'>
              <div className='grid__col--8'>
                <strong>Item</strong>
                <p>{invoice.items[key].description}</p>
              </div>
              <div className='grid__col--4 text-right'>
                <strong>{parseInt(invoice.items[key].price).toFixed(2) || '0.00'} $</strong>
              </div>
            </div>
            )
        })}
        </section>

        <hr/>

        <section className='section'>
          <div className='grid grid--middle'>
            <div className='grid__col--3'>
              <h4>Subtotal</h4>
              <strong>{subTotal()}$</strong>
            </div>

            <div className='grid__col--3'>
              <h4>Taxes</h4>
              <strong>{taxes()}$</strong>
            </div>

            {amountReceived}

            <div className='grid__col--3 text-right'>
              <h4>Balance Due</h4>
              <strong className='text-accent'>{parseInt(invoice.balance).toFixed(2)}$</strong>
            </div>
          </div>
        </section>

        <hr/>

        <section className='section' style={{minHeight: '220px'}}>
          <p>
            Please send payment within 21 days of receiving this invoice. We accept payment via wire transfer or cheque.
          </p>
          <p>
            If you have any questions, feel free to contact us at
            <a href='mailto:hello@volume7.io'> hello@volume7.io </a>
          </p>
          <p>
            Sincerely, <br/> The Volume7 team
          </p>
        </section>

        <hr/>

        <footer className='section footer'>
          <div className='grid grid--middle'>
            <div className='grid__col--3'>
              <p>
                <a href='mailto:hello@volume7.io'>hello@volume7.io</a>
                <br/>
                <a href='http://volume7.io'>volume7.io</a>
              </p>
            </div>
            <div className='grid__col--3'>
              <p>Institution: 003<br/>Transit: 07671</p>
            </div>
            <div className='grid__col--4'>
              <p>Account (USD) : 4002648<br/>Account (CAD) : 1009620</p>
            </div>
            <div className='grid__col--2 text-right'>
              <a href='http://volume7.io'><img src={logoMuted} style={{width: '46px'}}/></a>
            </div>
          </div>
        </footer>

      </div>
    )
  }
}
/*
SubTotal: {subTotal()} $
Tps: {tps()} $
Tvq: {tvq()} $
Taxes: {taxes()} $
Total: {total()} $
Purpose: {invoice.purpose}
{invoice.amountReceived ? 'Amount received: ' + invoice.amountReceived : ''}
{invoice.balance ? 'Balance: ' + invoice.balance : ''}
Local or International: {invoice.localInternational}
*/

function mapStateToProps (state) {
  return {
    invoice: state.invoice
  }
}

export default connect(mapStateToProps)(HeaderPreview)
