import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigaion from './Components/Navigation'
import Home from './Pages/Home'
import NotFound from './Pages/Notfound'
import Header from './Components/Header'
import Button from './Components/Button'
import Course from './Components/Course'
import Login from './Pages/LoginPage'


function App() {
  return (
    <div>
      
      <Header><Button label="Submit" color="blue" bcol="blue" hoverBg="White"/></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Course />} />
        <Route path="/Login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navigaion /> 
    </div>
  )
}

export default App