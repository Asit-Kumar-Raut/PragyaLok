import React from "react";
import "./Banner1.css";
import { Link } from "react-router-dom";
import Course from "./Course";

const Banner1 = () => {
  return (
    <section className="container banner mt-5">
      <div className="text">
        <h1>Reimagine your career in the AI era</h1>
        <p>
          Future-proof your skills with Personal Plan. Get access to a variety of
          fresh content from real-world experts.
        </p>

        <div className="points">
          <p>✨ <span>Learn</span> AI and more</p>
          <p>🏆 <span>Prep</span> for a certification</p>
          <p>🤖 <span>Practice</span> with AI coaching</p>
          <p>🚀 <span>Advance</span> your career</p>
        </div>

        <Link to="/Course"><button className="learn-btn">Learn more</button></Link>
        <p className="price-text">Starting at ₹500/month</p>
      </div>

      <div className="images">
        <div className="img-box">
          <img className="img1" src="/banner1.png" alt="AI course" />
        </div>
        <div className="img-box">
          <img className="img2" src="/banner2.png" alt="AI learning group" />
        </div>
      </div>
    </section>
  );
};

export default Banner1;
