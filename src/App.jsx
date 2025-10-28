import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigaion from './Components/Navigation'
import Home from './Pages/Home'
import NotFound from './Pages/Notfound'
import Header from './Components/Header'
import Button from './Components/Button'


function App() {
  return (
    <div>
      
      <Header><Button label="Submit" color="blue" bcol="blue" hoverBg="White"/></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Navigaion /> //Navigation bar always visible 
    </div>
  )
}

export default App