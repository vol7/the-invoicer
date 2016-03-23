import React, { PropTypes } from 'react'
import { Component } from 'react'

export default class Money extends Component {
  static propTypes = {
    amount: PropTypes.node
  }

  // Formats currency to 1,234,567,890.99$
  formatCurrency (value) {
    // If empty use 0 as default
    let amount = (parseFloat(value) || 0).toFixed(2)

    // Asign '-' for minus and '' for plus to sign
    // and if amount is negative asigns the absolute value of itself to amount
    let sign = ''
    if (amount < 0) {
      sign = '-'
      amount *= -1
    }

    // Splits amount into two part, the units (leftPart) and the decimals (rightPart)
    // We keep the rightPart untouched to concatenate at the end and
    // split the left into an array of single digits 1234 => [1],[2],[3],[4]
    let [leftPart, rightPart] = amount.toString().split('.')
    leftPart = leftPart.split('')

    let number = [] // Will contain the left part with the added commas

    // Add commas every three digits in the leftPart of amount
    // We have to go in reverse order to account for the possiblity
    // of length that aren't multiple of three
    // [1],[2],[3],[4] => [4],[3],[2],[,],[1]
    for (let i = 0; i < leftPart.length; i++) {
      number.push(leftPart[leftPart.length - i - 1])
      // If we are at a digit that his position is a multiple of three but
      // isn't the last digit, we add a comma
      if ((i + 1) % 3 === 0 && (i + 1) !== leftPart.length) {
        number.push(',')
      }
    }
    number = number.reverse().join('')
    number = (sign + number + '.' + rightPart + '$')
    return number
  }

  render () {
    return (
      <span>{this.formatCurrency(this.props.amount)}</span>
    )
  }
}
