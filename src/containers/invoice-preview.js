import React, { Component } from 'react'
import { PropTypes } from 'react'
import { connect } from 'react-redux'
import classNames from 'classnames'

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
    const { invoice } = this.props

    const subTotal = () => {
      if (invoice.items && invoice.items.length) {
        return (invoice.items.map((item) => (parseFloat(item.price)) || 0).reduce((a, b) => a + b))
      } else {
        return 0
      }
    }

    const tvq = () => subTotal() * TVQ
    const tps = () => subTotal() * TPS
    const total = () => subTotal() + tps() + tvq()
    const balance = () => total() - invoice.paid

    const subtotalDisplay = (
      <div className='grid__col--3'>
        <h4>Subtotal</h4>
        <strong><Money amount={subTotal()}/></strong>
      </div>
    )

    const tpsDisplay = !invoice.international ? (
      <div className='grid__col--3'>
        <h4>TPS</h4>
        <strong><Money amount={tps()}/></strong>
      </div>
    ) : null

    const tvqDisplay = !invoice.international ? (
      <div className='grid__col--3'>
        <h4>TVQ</h4>
        <strong><Money amount={tvq()}/></strong>
      </div>
    ) : null

    const totalTextClasses = classNames({ 'text-accent':  !invoice.paid && !invoice.paymentDue })

    const totalDisplay = (
      <div className={'grid__col--3'}>
        <h4>Total</h4>
        <strong className={totalTextClasses}><Money amount={total()}/></strong>
      </div>
    )

    const paidTextClasses = classNames({ 'text-accent': invoice.paid && !invoice.paymentDue })

    const paidDisplay = invoice.paid ? (
      <div className='grid__col--3'>
        <h4>Paid</h4>
        <strong className={paidTextClasses}><Money amount={invoice.paid}/></strong>
      </div>
    ) : null

    const balanceDisplay = invoice.paid ? (
      <div className='grid__col--3'>
        <h4>Balance</h4>
        <strong><Money amount={balance()}/></strong>
      </div>
    ) : null

    const paymentDueClasses = classNames({ 'text-accent': invoice.paid && invoice.paymentDue })

    const paymentDueDisplay = invoice.paymentDue && invoice.paid ? (
      <div className='grid__col--3'>
        <h4>Payment due</h4>
        <strong className={paymentDueClasses}><Money amount={invoice.paymentDue}/></strong>
      </div>
    ) : null

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
              <strong>{invoice.client}</strong>
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

            {subtotalDisplay}
            {tpsDisplay}
            {tvqDisplay}
            {totalDisplay}

          </div>
        </section>
        <section className={classNames({'hidden': !paidDisplay && !balanceDisplay && !paymentDueDisplay, 'section': true })}>
          <div className='grid grid--middle'>

            {paidDisplay}
            {balanceDisplay}
            {paymentDueDisplay}

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
