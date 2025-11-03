import React from "react";
import { Carousel, Container, Row, Col } from "react-bootstrap";
import CourseCard from "./module1/CourseCard1.jsx";
import "./CoursesCarousel.css";

const CoursesCarousel = ({ title, courses = [] }) => {
  // Break the 12-course array into slides (4 per slide)
  const chunkSize = 4;
  const slides = [];
  for (let i = 0; i < courses.length; i += chunkSize) {
    slides.push(courses.slice(i, i + chunkSize));
  }

  return (
    <Container className="my-5" style={{overflow:"visible"}}>
      {/* ✅ Title */}
      <h3 className="fw-bold mb-4">{title}</h3>

      {/* ✅ Carousel */}
      <Carousel indicators={false} interval={4000} pause="hover">
        {slides.map((slideCourses, index) => (
          <Carousel.Item key={index}>
            <Row className="g-3 justify-content-center">
              {slideCourses.map((course, idx) => (
                <Col
                  key={idx}
                  xs={6}
                  md={3}
                  className="d-flex justify-content-center"
                >
                  <CourseCard {...course} />
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default CoursesCarousel;
