import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navigaion from './Components/Navigation'
import Home from './Pages/Home'
import NotFound from './Pages/Notfound'
import Header from './Components/Header'
import Button from './Components/Button'
import Course from './Components/Course'
import Ai from './Components/ai.jsx'
import CourseDetails from './Components/CourseDetails.jsx'
import Trending from './Components/Trending';
import Feature1 from './Components/Feature1';


function App() {
  return (
    <div>
      <Header><Button label="Submit" color="blue" bcol="blue" hoverBg="White"/></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path='/course' element={<Course />} />
        <Route path='/ai' element={<Ai />} />
         <Route path="/course/:id" element={<CourseDetails />} />
      </Routes>
      <Navigaion /> 
      {/* Navigation bar always visible  */}
    </div>
  )
}

export default App