import React, { Component } from 'react'

import InvoicePreview from '../../containers/invoice-preview'
import InvoiceForm from '../../components/invoice-form'

export default class HomeView extends Component<void, Props, void> {
  render () {
    return (
      <div className='container'>
        <InvoiceForm />
        <InvoicePreview />
      </div>
    )
  }
}
