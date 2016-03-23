import React, { PropTypes } from 'react'
import { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import update from 'react-addons-update'

import FormItem from './form-item'

import { actions } from '../redux/modules/invoice'

const initialState = {
  items: []
}

const emptyItem = {
  description: '',
  price: null,
  name: ''
}

class FormItemList extends Component {
  static propTypes = {
    fieldChange: PropTypes.func.isRequired
  }

  constructor (props) {
    super(props)

    this.state = initialState

    this.props.fieldChange(initialState)

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.changeItem = this.changeItem.bind(this)
    this.applyChanges = this.applyChanges.bind(this)
    this.reset = this.reset.bind(this)
  }

  changeItem (item, index) {
    const newState = update(this.state, {
      items: {
        $splice: [[[index], 1, item]]
      }
    })
    this.applyChanges(newState)
  }

  addItem (event) {
    event.preventDefault()

    const newState = update(this.state, {
      items: {
        $push: [emptyItem]
      }
    })
    this.applyChanges(newState)
  }

  removeItem (event, index) {
    event.preventDefault()

    const newState = update(this.state, {
      items: {
        $splice: [[[index], 1]]
      }
    })
    this.applyChanges(newState)
  }

  applyChanges (newState) {
    this.props.fieldChange(newState)
    this.setState(newState)
  }

  reset () {
    this.applyChanges(initialState)
  }

  render () {
    return (
      <div>
        {this.state.items.map((item, i) =>
          <FormItem
            item={item}
            key={i}
            index={i}
            removeItem={this.removeItem}
            changeItem={this.changeItem}
          />
        )}
        <button onClick={this.addItem} className='btn btn--ghost'>+ Add item</button>
        <hr/>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fieldChange: actions.fieldChange }, dispatch)
}

export default connect(null, mapDispatchToProps)(FormItemList)
