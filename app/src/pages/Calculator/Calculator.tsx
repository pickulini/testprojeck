import { useState } from 'react'
import './Calculator.css'
import { OPERATORS, BUTTONS, ERROR, MAX_DIGITS } from './constants'
import { calculate } from './helpers'
import type { CalculatorButton } from './types'

function Calculator() {

  const [tokens, setTokens] = useState<string[]>([])
  const [isError, setIsError] = useState(false)

  const lastToken = tokens.at(-1) ?? ''
  const lastIsOperator = OPERATORS.includes(lastToken)
  const currentNumber = lastIsOperator ? '' : lastToken
  const displayText = isError ? ERROR : tokens.join(' ') || '0'


  function addToken(token: string) {
    setTokens([...tokens, token])
  }

  function replaceLastToken(token: string) {
    setTokens([...tokens.slice(0, -1), token])
  }

  function removeLastToken() {
    setTokens(tokens.slice(0, -1))
  }

  function reset() {
    setTokens([])
    setIsError(false)
  }


  function handleDigit(digit: string) {
    if (isError) {
      setIsError(false)
      setTokens([digit])
      return
    }

    if (currentNumber === '') {
      addToken(digit)
      return
    }

    if (currentNumber.replace(/[.-]/g, '').length >= MAX_DIGITS) return

    if (currentNumber === '0') {
      replaceLastToken('0.' + digit)
      return
    }

    replaceLastToken(currentNumber + digit)
  }

  function handleDot() {
    if (isError) {
      setIsError(false)
      setTokens(['0.'])
      return
    }

    if (currentNumber === '') {
      addToken('0.')
      return
    }

    if (currentNumber.includes('.')) return

    replaceLastToken(currentNumber + '.')
  }

  function handleOperator(operator: string) {
    if (isError || tokens.length === 0) return

    if (lastIsOperator) {
      replaceLastToken(operator)
    } else {
      addToken(operator)
    }
  }

  function handleEquals() {
    if (isError || tokens.length === 0 || lastIsOperator) return

    const result = calculate(tokens)
    if (result === null) {
      setTokens([])
      setIsError(true)
    } else {
      setTokens([String(Number(result.toFixed(10)))])
    }
  }

  function handleErase() {
    if (isError) {
      reset()
      return
    }

    if (tokens.length === 0) return

    if (lastIsOperator) {
      removeLastToken()
      return
    }

    const shorter = currentNumber.slice(0, -1)
    if (shorter === '' || shorter === '-') {
      removeLastToken()
    } else {
      replaceLastToken(shorter)
    }
  }

  function handleClick(button: CalculatorButton) {
    switch (button.type) {
      case 'digit':
        handleDigit(button.label)
        break
      case 'dot':
        handleDot()
        break
      case 'operator':
        handleOperator(button.label)
        break
      case 'equals':
        handleEquals()
        break
      case 'erase':
        handleErase()
        break
      case 'clear':
        reset()
        break
    }
  }

  function getButtonClass(button: CalculatorButton) {
    const classes = ['key', `key--${button.type}`]
    if (button.wide) classes.push('key--wide')
    return classes.join(' ')
  }

  return (
    <div className="calculator">
      <div className="screen">{displayText}</div>

      <div className="keys">
        {BUTTONS.map((button) => (
          <button
            key={button.label}
            className={getButtonClass(button)}
            onClick={() => handleClick(button)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Calculator
