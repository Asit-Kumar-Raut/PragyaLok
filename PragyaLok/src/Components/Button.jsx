import React from 'react'
import './Button.css'

const Button = (props) => {
  return (
    <button className='btn custom-btn' style={{color:props.color,  border: `2px solid ${props.bcol}`}}>
      {props.label}
    </button>
  )
}

export default Button