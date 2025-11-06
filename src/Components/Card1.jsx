import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./Card1.css";

function Card1({ img, title, sub, category }) {
  return (
    <Link to={`/?category=${category}`} className="card-link">
      <Card className="custom-card">
        {/* Image */}
        <div className="image-wrapper">
          <Card.Img
            src={img || "/Image1.png"}
            alt="cover"
            className="card-image"
          />
        </div>

        {/* Floating overlay */}
        <div className="card-body-custom">
          <div className="text-content">
            <div className="card-text-left">
              <img
                src="/people.png"
                alt="people"
                style={{ marginRight: "4px", height: "14px" }}
              />
              {sub || "8m+"}
            </div>

            <div className="card-text-title">{title || "Course"}</div>
          </div>

      <img src="/right-arrow.png" alt="arrow" className="arrow-icon" />
        </div>
      </Card>
    </Link>
  );
}

export default Card1;