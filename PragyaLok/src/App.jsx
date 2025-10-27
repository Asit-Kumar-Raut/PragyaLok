import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './Components/Header'
import Home from './Pages/Home'
import NotFound from './Pages/Notfound'

function App() {
  return (
    <div>
      <Header /> {/* Navigation bar always visible */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
