import React from 'react'
import { PropTypes } from 'react'
import { Component } from 'react'
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'

// import { actions } from '../redux/modules/invoice'

export default class FormItem extends Component {
  static propTypes = {
    removeItem: PropTypes.func.isRequired,
    index: PropTypes.number.isRequired
  }

  constructor (props) {
    super(props)

    this.state = {removeItem: this.props.removeItem.bind(this, event, this.props.index)}
    this.changeItem = this.changeItem.bind(this)
  }

  changeItem (event, item) {
    event.preventDefault()
  }

  render () {
    return (
      <div>
        <div>
          Description:
          <input
            type='text'
            name='description'
            onChange={this.changeItem}>
          </input>
        </div>
        <div>
        </div>
        <div>
          Prix:
          <input
            type='text'
            name='price'
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
