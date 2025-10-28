import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <nav>
      <Link to="/">🏠 Home</Link> |{" "}
      <Link to="/about">ℹ️ About</Link> |{" "}
      <Link to="/contact">📞 Contact</Link>
    </nav>
  )
}

export default Header