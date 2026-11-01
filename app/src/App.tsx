// App.tsx
import { Routes, Route, NavLink } from 'react-router'
import Calculator from './pages/Calculator'
import Planner from './pages/Planner'

function App() {
  return (
    <>
      <nav>
        <NavLink to="/Calculator">Калькулятор</NavLink>
        <NavLink to="/Planner">Планировщик</NavLink>
      </nav>

      <Routes>
        <Route path="/Calculator" element={<Calculator />} />
        <Route path="/Planner" element={<Planner />} />
      </Routes>
    </>
  )
}

export default App