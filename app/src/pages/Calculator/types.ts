export type ButtonType = 'digit' | 'dot' | 'operator' | 'equals' | 'erase' | 'clear'

export type CalculatorButton = {
  label: string
  type: ButtonType
  wide?: boolean
}
