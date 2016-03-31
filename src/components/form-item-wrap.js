import React, { PropTypes } from 'react'
import { Component } from 'react'
import { DropTarget } from 'react-dnd'

import {ItemTypes} from './form-item'

import FormItem from './form-item'

const formItemTarget = {
  drop (props, monitor) {
    props.moveItem(monitor.getItem().invoiceItemIndex, props.index)
  }
}

function collect (connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  }
}

class FormItemWrap extends Component {
  static propTypes = {
    changeItem: PropTypes.func,
    removeItem: PropTypes.func,
    index: PropTypes.number.isRequired,
    item: PropTypes.object.isRequired,
    connectDropTarget: PropTypes.func
  }

  render () {
    const { connectDropTarget, isOver } = this.props
    return connectDropTarget(
      <div>
        <FormItem
          item={this.props.item}
          key={this.props.index}
          index={this.props.index}
          removeItem={this.props.removeItem}
          changeItem={this.props.changeItem}
        />
      </div>
    )
  }
}

export default DropTarget(ItemTypes.INVOICE_ITEM, formItemTarget, collect)(FormItemWrap)
