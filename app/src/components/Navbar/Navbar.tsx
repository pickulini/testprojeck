import { NavLink } from 'react-router'
import { ROUTES } from '../../constants/routes'
import './Navbar.css'

function Navbar() {
  return (
    <nav className="navbar">
      {Object.values(ROUTES).map((route) => (
        <NavLink className="navbar__link" key={route.path} to={route.path}>
          {route.label}
        </NavLink>
      ))}
    </nav>
  )
}

export default Navbar
