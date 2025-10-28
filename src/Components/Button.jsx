import React from 'react'
import './Button.css'

const Button = (props) => {
  const { label, color, bcol, hoverBg } = props

  return (
    <button
      className='btn custom-btn'
      style={{
        color: color,
        border: `2px solid ${bcol}`,
        '--hover-bg': hoverBg,  // Pass hover background via CSS variable
      }}
    >
      {label}
    </button>
  )
}

export default Button
