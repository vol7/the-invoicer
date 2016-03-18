import React from 'react'
import { PropTypes } from 'react'
import { Component } from 'react'

export default class FormItem extends Component {
  static propTypes = {
    removeItem: PropTypes.func.isRequired,
    changeItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {
      removeItem: this.props.removeItem.bind(this, event, this.props.index)
    }

    this.changeItem = this.changeItem.bind(this)
  }

  changeItem (event) {
    event.preventDefault()
    let item = {}
    switch (event.target.name) {
      case 'description':
        item = {
          [event.target.name]: event.target.value,
          'price': this.props.item.price
        }
        break
      case 'price':
        item = {
          description: this.props.item.description,
          [event.target.name]: event.target.value
        }
        break
    }
    this.props.changeItem(item, this.props.index)
  }

  render () {
    return (
      <div>
        <div>
          Description:
          <input
            type='text'
            name='description'
            value={this.props.item.description}
            onChange={this.changeItem}>
          </input>
        </div>
        <div>
        </div>
        <div>
          Prix:
          <input
            type='number'
            name='price'
            value={this.props.item.price}
            onChange={this.changeItem}>
          </input>
        </div>
        <input
          type='button'
          onClick={this.state.removeItem}
          value='Remove item (-)'>
        </input>
        <div>
        --------------------------------------------------
        </div>
      </div>
    )
  }
}
