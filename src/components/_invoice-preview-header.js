import React, { Component } from 'react'

import logo from '../../images/logo.svg'

export const contactInformation = {
  name: 'Volume7 Inc.',
  adress: '301-3414 Avenue Du Parc, Montreal, Canada, H2X 2H5',
  email: 'hello@volume7.io',
  website: 'volume7.io',
  institution: '003',
  transit: '07671',
  accountUSD: '4002648',
  accountCAD: '1009620',
  GST: '84263 1830',
  QST: '1220456036'
}

export default class InvoicePreviewHeader extends Component {
  render () {
    return (
      <header className='header'>
        <div className='grid grid--middle'>
          <div className='grid__col--3'><img src={logo} style={{width: '46px'}} /></div>
          <div className='grid__col--3'><strong>{contactInformation.name}</strong></div>
          <div className='grid__col--6 text-right'><strong>{contactInformation.adress}</strong></div>
        </div>
      </header>
    )
  }
}
