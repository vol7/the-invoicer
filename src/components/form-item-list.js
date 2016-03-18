import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import update from 'react-addons-update'

import FormItem from './form-item'

import { actions } from '../redux/modules/invoice'

class FormItemList extends Component {
  static propTypes = {
    fieldChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      items: []
    }

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  addItem (event) {
    event.preventDefault()

    let newState = update(this.state, {items: {$push: [{description: '', price: ''}]}})
    this.props.fieldChange(newState)
    this.setState(newState)
  }

  removeItem (event, index) {
    event.preventDefault()

    let newState = update(this.state, {items: {$splice: [[[index], 1]]}})
    this.props.fieldChange(newState)
    this.setState(newState)
  }

  render () {
    return (
      <div>
        {this.state.items.map((item, i) => <FormItem item={item} key={i} index={i} removeItem={this.removeItem}/>)}
        <input type='button' onClick={this.addItem} value='Add new Item (+)'/>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fieldChange: actions.fieldChange }, dispatch)
}

export default connect(null, mapDispatchToProps)(FormItemList)
