export function calculate(tokens: string[]): number | null {

  const stack: (number | string)[] = [Number(tokens[0])]

  for (let i = 1; i < tokens.length; i += 2) {
    const operator = tokens[i]
    const next = Number(tokens[i + 1])

    if (operator === '*' || operator === '/') {
      const prev = stack.pop() as number
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
