import { useState } from 'react'
import '../App.css'

const OPERATORS = ['+', '-', '*', '/']

const BUTTONS = [
  '7', '8', '9', '/',
  '4', '5', '6', '*',
  '1', '2', '3', '-',
  '0', '.', '=', '+',
  '<-'
]

const ERROR = 'Ошибка'

function calculate(expression: string): number | null {
  const parts = expression.trim().split(' ')

  const stack: (number | string)[] = [Number(parts[0])]

  for (let i = 1; i < parts.length; i += 2) {
    const operator = parts[i]
    const next = Number(parts[i + 1])

    if (operator === '*' || operator === '/') {
      const prev = stack.pop() as number        // забираем последнее число
      if (operator === '/' && next === 0) return null
      stack.push(operator === '*' ? prev * next : prev / next)
    } else {
      stack.push(operator, next)
    }
  }

  // Проход 2: слева направо складываем и вычитаем то, что осталось
  let result = stack[0] as number
  for (let i = 1; i < stack.length; i += 2) {
    const operator = stack[i]
    const next = stack[i + 1] as number
    result = operator === '+' ? result + next : result - next
  }

  return result
}

function Calculator() {
  const [text, setText] = useState('')

  const endsWithOperator = OPERATORS.includes(text.trim().slice(-1))

  function handleDigit(digit: string) {
    if (text === ERROR) {
      setText(digit === '.' ? '0.' : digit)
      return
    }

    if (digit === '.') {
      const parts = text.split(' ')
      const currentNumber = parts[parts.length - 1]   
      if (currentNumber.includes('.')) return          
      if (currentNumber === '') {                      
        setText(text + '0.')
        return
      }
    }

    setText(text + digit)
  }

  function handleOperator(operator: string) {
    if (text === '' || text === ERROR) return

    if (endsWithOperator) {
      setText(text.slice(0, -3) + ` ${operator} `)
    } else {
      setText(text + ` ${operator} `)
    }
  }

  function handleEquals() {
    if (text === '' || text === ERROR || endsWithOperator) return

    const result = calculate(text)
    if (result === null) {
      setText(ERROR)
    } else {
      setText(String(Number(result.toFixed(10))))
    }
  }

  function handleErase() {
    if (endsWithOperator) {
      setText(text.slice(0, -3))
    } else {
      setText(text.slice(0, -1))
    }
  }

  function handleClick(button: string) {
    if (OPERATORS.includes(button)) handleOperator(button)
    else if (button === '=') handleEquals()
    else if (button === '<-') handleErase()
    else handleDigit(button)
  }

  function getButtonClass(button: string) {
    if (OPERATORS.includes(button)) return 'key operator'
    if (button === '=') return 'key equals'
    return 'key'
  }

  return (
    <div className="Calculator">
      <div className="screen">{text || '0'}</div>

      <button className="key clear" onClick={() => setText('')}>
        Очистить
      </button>

      <div className="keys">
        {BUTTONS.map((button) => (
          <button
            key={button}
            className={getButtonClass(button)}
            onClick={() => handleClick(button)}
          >
            {button}
          </button>
        ))}
      </div>
    </div>
  )
}

export default Calculator
