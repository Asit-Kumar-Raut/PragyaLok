import React from "react";
import Card1 from "./Card1";
import "./Feature1.css"; // new for cleaner layout

const Feature1 = () => {
  return (
    <div className="container feature-container">
      {/* Left text section */}
      <div className="feature-text">
        <h2>Learn essential career and life skills</h2>
        <p>
         Upanayana helps you build in-demand skills fast and advance your career
          in a changing job market.
        </p>
      </div>

      {/* Right card section */}
      <div className="feature-cards">
        <Card1 img="/Image6.png" title="🤖Artificial Intelligence" sub={"12m+"} />
        <Card1 img="/Image7.png" title="💻Development" sub={"10m+"} />
        <Card1 img="/Image8.png" title="🎨Graphic Design" />
      </div>
    </div>
  );
};

export default Feature1;
