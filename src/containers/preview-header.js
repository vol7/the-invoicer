import React, {Component} from 'react'
import { PropTypes } from 'react'
import {connect} from 'react-redux'

class HeaderPreview extends Component {
  static propTypes = {
    number: PropTypes.string
  };
  render () {
    return (
      <div>
        <div>
          Invoice # : {this.props.number}
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    number: state.invoice
  }
}

export default connect(mapStateToProps)(HeaderPreview)
