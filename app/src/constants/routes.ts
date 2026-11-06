// Все маршруты приложения в одном месте.
// Обращаемся по ключу: ROUTES.calculator.path, ROUTES.planner.label
export const ROUTES = {
  calculator: { path: '/calculator', label: 'Калькулятор' },
  planner: { path: '/planner', label: 'Планировщик' },
} as const
