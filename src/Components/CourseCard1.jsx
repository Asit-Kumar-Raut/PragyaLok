import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./CourseCard1.css";

const CourseCard1 = ({
  id,
  img,
  title,
  teacher,
  bestseller,
  rating,
  ratingsCount,
  newPrice,
  oldPrice,
  updatedDate,
  totalHours,
  level,
  description,
  consists = [],
  courseLink,
  buyLink,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="course-card-wrapper position-relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ✅ Card Section */}
      <Card
        className="shadow-sm course-card h-100 text-decoration-none"
        style={{ cursor: "pointer" }}
        as={Link}
        to={`/course/${id}`}
      >
        <Card.Img variant="top" src={img} alt={title} />
        <Card.Body>
          <Card.Title className="fw-bold">{title}</Card.Title>
          <Card.Text className="text-muted mb-1">{teacher}</Card.Text>
          {bestseller && (
            <Badge bg="success" className="mb-2">
              Bestseller
            </Badge>
          )}
          <div className="rating-section mb-2">
            ⭐ {rating} ({ratingsCount.toLocaleString()} ratings)
          </div>
          <div className="price-section">
            <span className="fw-bold">₹{newPrice}</span>{" "}
            <span className="text-muted text-decoration-line-through">
              ₹{oldPrice}
            </span>
          </div>
        </Card.Body>
      </Card>

      {/* ✅ Hover Popup */}
      {hovered && (
        <div className="course-popup shadow-lg bg-white p-3">
          <h5 className="fw-bold">{title}</h5>
          {bestseller && <Badge bg="success">Bestseller</Badge>}
          <p className="text-muted mb-1">
            Updated <strong>{updatedDate}</strong>
          </p>
          <p className="small mb-2 text-muted">
            {totalHours} total hours • {level}
          </p>
          <p className="desc mb-2">{description}</p>
          <ul className="list-unstyled small">
            {consists.slice(0, 3).map((line, i) => (
              <li key={i}>✔ {line}</li>
            ))}
          </ul>
          <Button
            variant="primary"
            as={Link}
            to={`/course/${id}`}
            className="w-100 mt-2"
          >
            Know More
          </Button>
        </div>
      )}
    </div>
  );
};

export default CourseCard1;