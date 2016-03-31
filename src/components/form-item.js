import React from 'react'
import { PropTypes } from 'react'
import { Component } from 'react'
import drag from '../../images/drag.svg'
import { DragSource } from 'react-dnd'
import update from 'react-addons-update'

const invoiceItemSource = {
  beginDrag (props) {
    return { invoiceItemIndex: props.index }
  }
}

export const ItemTypes = {
  INVOICE_ITEM: 'invoiceItem'
}

function collect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class FormItem extends Component {
  static propTypes = {
    removeItem: PropTypes.func.isRequired,
    changeItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func
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
    const { connectDragSource, isDragging } = this.props
    return connectDragSource(
      <div>
        <div className='grid'>
          <div className='grid__col--10'>
            <h3 className='sidebar__item'>
              <img className='icon icon--small' src={drag}/>
              <span>{this.props.item.name || 'Item'}</span>
            </h3>
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

export default DragSource(ItemTypes.INVOICE_ITEM, invoiceItemSource, collect)(FormItem)
