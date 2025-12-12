// src/pages/NotFound.jsx
import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ fontSize: '80px' }}>404</h1>
      <h2>Page Not Found 😢</h2>
      <p>The page you’re looking we are working on it please keep with use we will be with you you can contact us by our linked in account</p>
      <Link to="/">
        <button style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Go Back Home
        </button>
      </Link>
    </div>
  )
}

export default NotFound