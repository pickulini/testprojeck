import { Routes, Route, Navigate } from 'react-router'
import Navbar from './components/Navbar'
import Calculator from './pages/Calculator'
import Planner from './pages/Planner'
import { ROUTES } from './constants/routes'

function App() {
  return (
    <>
      <Navbar />

      <main className="main">
        <Routes>
          {/* С главной сразу перекидываем на калькулятор */}
          <Route path="/" element={<Navigate to={ROUTES.calculator.path} replace />} />
          <Route path={ROUTES.calculator.path} element={<Calculator />} />
          <Route path={ROUTES.planner.path} element={<Planner />} />
        </Routes>
      </main>
    </>
  )
}

export default App
