import React, { Component } from 'react'

import FormHeader from '../../components/form-header'
import FormPricing from '../../components/form-pricing'
import FormItemList from '../../components/form-item-list'
import HeaderPreview from '../../containers/preview-header'

export default class HomeView extends Component<void, Props, void> {
  render () {
    return (
      <div className='container'>
        <div>
        ##############################
        </div>
        <form>
          <FormHeader />
          //////////////////////////////////////////////////
          <FormItemList />
          //////////////////////////////////////////////////
          <FormPricing />
        </form>
        <div>
        ##############################
        </div>
        <div>
          <HeaderPreview />
        </div>
        <div>
        ##############################
        </div>
      </div>
    )
  }
}
