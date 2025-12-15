import React, { useState } from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./CourseCard1.module.css";

const CourseCard1 = ({
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
  className={styles["course-card-wrapper"]}
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>
  <Card
    className={`shadow-sm ${styles["course-card"]} h-100 text-decoration-none`}
    style={{ cursor: "pointer" }}
    as={Link}
    to={courseLink}
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
      <div className={`rating-section mb-2 ${styles["rating-section"]}`}>
        ⭐ {rating} ({ratingsCount.toLocaleString()} ratings)
      </div>
      <div className={`price-section ${styles["price-section"]}`}>
        <span className="fw-bold">₹{newPrice}</span>{" "}
        <span className="text-muted" style={{textDecoration: "line-through"}}>₹{oldPrice}</span>
      </div>
    </Card.Body>
  </Card>

  {hovered && (
    <div className={styles["course-popup"] + " shadow-lg bg-white p-3"}>
      <h5 className="fw-bold">{title}</h5>
      {bestseller && <Badge bg="success">Bestseller</Badge>}
      <p className="text-muted mb-1">
        Updated <strong>{updatedDate}</strong>
      </p>
      <p className="small mb-2 text-muted">
        {totalHours} total hours • {level}
      </p>
      <p className={styles.desc + " mb-2"}>{description}</p>
      <ul className="list-unstyled small">
        {consists.slice(0, 3).map((line, i) => (
          <li key={i}>✔ {line}</li>
        ))}
      </ul>
      <Button
        variant="primary"
        as={Link}
        to={buyLink}
        className="w-100 mt-2"
      >
        Add to cart
      </Button>
    </div>
  )}
</div>
  );
};

export default CourseCard1;
