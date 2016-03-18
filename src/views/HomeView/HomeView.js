import React from 'react'

import FormHeader from '../../components/form-header'
import FormPricing from '../../components/form-pricing'
import FormItemList from '../../components/form-item-list'
import HeaderPreview from '../../containers/preview-header'

// We avoid using the `@connect` decorator on the class definition so
// that we can export the undecorated component for testing.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
export default class HomeView extends React.Component<void, Props, void> {
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
