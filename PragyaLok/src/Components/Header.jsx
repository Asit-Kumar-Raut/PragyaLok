import React from 'react'
import { Link } from 'react-router-dom'
// import logo from '../assets/logo.png'
import './Header.css'

const Header = ({ children }) => {
  return (
    <div
      className="d-flex bg-dark justify-content-between align-items-center px-4"
      style={{ height: '100px' }}
    >
      {/* <Link to="/">
        <img src={logo} alt="logo" style={{ height: '60px' }} />
      </Link> */}

      {/* ✅ Separate flex item on the right */}
      {children}
    </div>
  )
}

export default Header