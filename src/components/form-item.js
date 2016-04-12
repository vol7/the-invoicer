import React from 'react'
import { PropTypes, Component } from 'react'
import drag from '../../images/drag.svg'
import update from 'react-addons-update'
import { DragSource, DropTarget } from 'react-dnd'

import { findDOMNode } from 'react-dom'

const ItemTypes = {
  ITEM: 'item'
}

const itemSource = {
  beginDrag (props) {
    return {
      id: props.id,
      index: props.index
    }
  }
}

const itemTarget = {
  hover (props, monitor, component) {
    const dragIndex = monitor.getItem().index
    const hoverIndex = props.index

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

    // Determine mouse position
    const clientOffset = monitor.getClientOffset()

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return
    }

    // Time to actually perform the action
    props.moveItem(dragIndex, hoverIndex)

    monitor.getItem().index = hoverIndex
  }
}

function dragCollect (connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

function dropCollect (connect) {
  return {
    connectDropTarget: connect.dropTarget()
  }
}

class FormItem extends Component {
  static propTypes = {
    removeItem: PropTypes.func.isRequired,
    changeItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func,
    connectDropTarget: PropTypes.func,
    isDragging: PropTypes.bool.isRequired
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
    const { connectDragSource, connectDropTarget, isDragging } = this.props
    return connectDragSource(connectDropTarget(
      <div style={{
        opacity: isDragging ? 1 : 1
      }}>
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
      </div>
    ))
  }
}

export default DropTarget(ItemTypes.ITEM,
 itemTarget, dropCollect)(DragSource(ItemTypes.ITEM, itemSource, dragCollect)(FormItem))
