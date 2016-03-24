import React from 'react'
import { PropTypes } from 'react'
import { Component } from 'react'

import update from 'react-addons-update'

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
    const item = update(this.props.item, {
      [event.target.name]: { $set: event.target.value }
    })
    this.props.changeItem(item, this.props.index)
  }

  render () {
    return (
      <div>
        <div className='grid'>
          <div className='grid__col--10'>
            <h3 className='sidebar__item'>{this.props.item.name || 'Item'}</h3>
          </div>
          <div className='grid__col--2 text-right'>
            <button className='delete-icon' type='button' onClick={this.state.removeItem}>×</button>
          </div>
        </div>
        <div className='grid'>
          <div className='grid__col--8'>
            <div className='field'>
              <label className='field__label'>Name</label>
              <input
                className='field__input'
                type='text'
                name='name'
                value={this.props.item.name}
                onChange={this.changeItem}>
              </input>
            </div>
          </div>
          <div className='grid__col--4'>
            <div className='field'>
              <label className='field__label'>Price</label>
              <input
                className='field__input'
                type='number'
                name='price'
                value={this.props.item.price}
                onChange={this.changeItem}>
              </input>
            </div>
          </div>
        </div>
        <div className='field'>
          <label className='field__label'>Description (optional)</label>
          <input
            className='field__input'
            type='text'
            name='description'
            value={this.props.item.description}
            onChange={this.changeItem}>
          </input>
        </div>
        <hr/>
      </div>
    )
  }
}
