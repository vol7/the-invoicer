import React, { Component } from 'react'
import { PropTypes } from 'react'
import { connect } from 'react-redux'

import Money from '../components/money'
import InvoicePreviewFooter from '../components/_invoice-preview-footer'
import InvoicePreviewHeader from '../components/_invoice-preview-header'

class InvoicePreview extends Component {
  static propTypes = {
    invoice: PropTypes.object
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

    let tpsDisplay = invoice.international ? '' : (
      <div className='grid__col--grow'>
        <h4>TPS</h4>
        <strong><Money amount={tps()}/></strong>
      </div>
    )

    let tvqDisplay = invoice.international ? '' : (
      <div className='grid__col--grow'>
        <h4>TVQ</h4>
        <strong><Money amount={tvq()}/></strong>
      </div>
    )

    let amountReceived = !invoice.amountReceived ? '' : (
      <div className='grid__col--grow'>
        <h4>Paid</h4>
        <strong><Money amount={invoice.amountReceived}/></strong>
      </div>
    )

    return (
      <div className='site-wrap'>
        <InvoicePreviewHeader />
        <section className='section'>
          <div className='grid'>
            <div className='grid__col--3'>
              <h4>Invoice</h4>
              <strong>{invoice.number}</strong>
            </div>

            <div className='grid__col--3'>
              <h4>Client</h4>
              <strong>{invoice.client.name}</strong>
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

            {tpsDisplay}
            {tvqDisplay}

            {amountReceived}

            <div className='grid__col--grow text-right'>
              <h4>Balance Due</h4>
              <strong className='text-accent'><Money amount={invoice.balance || total()}/></strong>
            </div>
          </div>
        </section>

        <hr/>

        <InvoicePreviewFooter invoice={invoice}/>
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
