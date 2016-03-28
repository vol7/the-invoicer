import React, { Component } from 'react'
import { PropTypes } from 'react'
import { connect } from 'react-redux'

import logo from '../../images/logo.svg'
import logoMuted from '../../images/logo-muted.svg'

import Money from '../components/money'

const contactInformation = {
  name: 'Volume7 Inc.',
  adress: '94 Champlain, Montreal, QC H8Y 3S5',
  email: 'hello@volume7.io',
  website: 'volume7.io',
  institution: '003',
  transit: '07671',
  accountUSD: '4002648',
  accountCAD: '1009620'
}

class InvoicePreview extends Component {
  static propTypes = {
    invoice: PropTypes.shape({
      number: PropTypes.string,
      clientName: PropTypes.string,
      projectName: PropTypes.string,
      purpose: PropTypes.string,
      date: PropTypes.string,
      amountReceived: PropTypes.string,
      balance: PropTypes.string,
      international: PropTypes.boolean
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
        return (invoice.items.map((item) => (parseFloat(item.price)) || 0).reduce((a, b) => a + b))
      } else {
        return 0
      }
    }

    const total = function () {
      const taxes = invoice.international ? 1 : (1 + TVQ + TPS)
      return subTotal() * taxes - invoice.amountReceived
    }

    const tvq = function () {
      return subTotal() * TVQ
    }

    const tps = function () {
      return subTotal() * TPS
    }

    let taxes = ''
    if (!invoice.international) {
      taxes = (
        <div className='grid__col--grow'>
          <h4>TPS | TVQ</h4>
          <strong><Money amount={tps()}/> | <Money amount={tvq()}/></strong>
        </div>
      )
    }

    let amountReceived = ''
    if (invoice.amountReceived) {
      amountReceived = (
        <div className='grid__col--grow'>
          <h4>Paid</h4>
          <strong><Money amount={invoice.amountReceived}/></strong>
        </div>
      )
    }

    const account = (
      <p>Account: {invoice.international ? contactInformation.accountUSD : contactInformation.accountCAD}</p>
    )

    return (
      <div className='site-wrap'>
        <header className='header'>
          <div className='grid grid--middle'>
            <div className='grid__col--3'><img src={logo} style={{width: '46px'}}/></div>
            <div className='grid__col--3'><strong>{contactInformation.name}</strong></div>
            <div className='grid__col--6 text-right'><strong>{contactInformation.adress}</strong></div>
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
            <div className='grid item' key={key}>
              <div className='grid__col--8'>
                <strong>{invoice.items[key].name || 'Item'}</strong>
                <p>{invoice.items[key].description || 'Description'}</p>
              </div>
              <div className='grid__col--4 text-right'>
                <strong><Money amount={invoice.items[key].price}/></strong>
              </div>
            </div>
            )
        })}
        </section>

        <hr/>

        <section className='section'>
          <div className='grid grid--middle'>
            <div className='grid__col--grow'>
              <h4>Subtotal</h4>
              <strong><Money amount={subTotal()}/></strong>
            </div>

            {taxes}

            {amountReceived}

            <div className='grid__col--grow text-right'>
              <h4>Balance Due</h4>
              <strong className='text-accent'><Money amount={invoice.balance || total()}/></strong>
            </div>
          </div>
        </section>

        <hr/>

        <section className='section' style={{minHeight: '220px'}}>
          <p>Please send payment within 21 days of receiving this invoice.
          We accept payment via wire transfer or cheque.</p>
          <p>If you have any questions, feel free to contact us at <a href={`mailto:${contactInformation.email}`}>
          {contactInformation.email}</a></p>
          <p>Sincerely, <br/> The Volume7 team</p>
        </section>

        <hr/>

        <footer className='section footer'>
          <div className='grid'>
            <div className='grid__col--grow'>
              <p>
                <a href='mailto:hello@volume7.io'>{contactInformation.email}</a>
                <br/>
                <a href='http://volume7.io'>{contactInformation.website}</a>
              </p>
            </div>
            <div className='grid__col--3'>
              <p>Institution: {contactInformation.institution}<br/>Transit: {contactInformation.transit}</p>
            </div>
            <div className='grid__col--3'>
              {account}
            </div>
            <div className='grid__col--3 text-right'>
              <a href='http://volume7.io'><img src={logoMuted} style={{width: '46px'}}/></a>
            </div>
          </div>
        </footer>

      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    invoice: state.invoice
  }
}

export default connect(mapStateToProps)(InvoicePreview)
