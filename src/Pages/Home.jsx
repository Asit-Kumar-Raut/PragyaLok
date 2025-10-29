import React from 'react'
import CarouselTransition from '../Components/CarouselTransition'
import Feature1 from '../Components/Feature1'
import Banner1 from '../Components/Banner1'

const Home = () => {
  return (
    <div>
      <CarouselTransition wd={"90vw"} hg={"55vh"} im1={"/Image1.png"} im2={"/Image2.png"} im3={"/Image3.png"} 
        t1={"Learn anything, anytime — from coding to creativity."}
        p1={"Showcase the platform’s wide variety of courses and learning freedom."}
        t2={"Learn from real industry experts."}
        p2={"Build trust by emphasizing real instructors and quality teaching."}
        t3={"Your personalized learning path — powered by AI."}
        p3={"Highlight AI-driven recommendations or course tracking."}
      />
      <Feature1 />
      <Banner1 />
      <h1>Home Page</h1>
      <p>Hello! This is your home page content 👋</p>
    </div>
  )
}

export default Home