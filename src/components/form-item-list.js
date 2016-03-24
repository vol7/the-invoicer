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
    fieldChange: PropTypes.func.isRequired,
    invoice: PropTypes.object
  }

  constructor (props) {
    super(props)

    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.changeItem = this.changeItem.bind(this)
  }

  changeItem (item, index) {
    const newState = update(this.props.invoice, {
      items: {
        $splice: [[[index], 1, item]]
      }
    })
    this.props.fieldChange(newState)
  }

  addItem (event) {
    event.preventDefault()

    const newState = update(this.props.invoice, {
      items: {
        $push: [emptyItem]
      }
    })
    this.props.fieldChange(newState)
  }

  removeItem (event, index) {
    const newState = update(this.props.invoice, {
      items: {
        $splice: [[[index], 1]]
      }
    })
    this.props.fieldChange(newState)
  }

  render () {
    return (
      <div>
        {this.props.invoice.items.map((item, i) =>
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

function mapStateToProps (state) {
  return {
    invoice: state.invoice
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ fieldChange: actions.fieldChange }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FormItemList)
