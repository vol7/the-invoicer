import React, { PropTypes } from 'react'
import { Component } from 'react'

import logoMuted from '../../images/logo-muted.svg'

import {contactInformation} from './_invoice-preview-header'

export default class InvoicePreviewFooter extends Component {
  static propTypes = {
    invoice: PropTypes.object
  }
  render () {
    const account = (
      <p>Account: {this.props.invoice.international ? contactInformation.accountUSD : contactInformation.accountCAD}</p>
    )

    return (
      <div>
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
