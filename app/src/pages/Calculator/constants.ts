import type { CalculatorButton } from './types'

export const OPERATORS = ['+', '-', '*', '/']

export const BUTTONS: CalculatorButton[] = [
  { label: 'C', type: 'clear', wide: true },
  { label: '⌫', type: 'erase' },
  { label: '/', type: 'operator' },

  { label: '7', type: 'digit' },
  { label: '8', type: 'digit' },
  { label: '9', type: 'digit' },
  { label: '*', type: 'operator' },

  { label: '4', type: 'digit' },
  { label: '5', type: 'digit' },
  { label: '6', type: 'digit' },
  { label: '-', type: 'operator' },

  { label: '1', type: 'digit' },
  { label: '2', type: 'digit' },
  { label: '3', type: 'digit' },
  { label: '+', type: 'operator' },

  { label: '0', type: 'digit', wide: true },
  { label: '.', type: 'dot' },
  { label: '=', type: 'equals' },
]

export const ERROR = 'Ошибка'

export const MAX_DIGITS = 12
