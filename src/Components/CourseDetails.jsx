import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './CourseDetails.css';

const CourseDetails = () => {
  const { id } = useParams();
  
  const courseData = {
    1: {
      title: "Programming in Python with AI",
      description: "Build apps using Python & AI tools.",
      fullDescription: "Learn Python programming from scratch and integrate AI capabilities into your applications. This course covers fundamental Python concepts, data structures, and how to leverage AI libraries for intelligent applications.",
      duration: "6 weeks",
      languages: ["English", "Hindi"],
      image: "python.webp",
      rating: "4.5",
      price: "₹4,999",
      instructor: "Dr. Sarah Johnson",
      level: "Beginner to Intermediate",
      modules: [
        "Python Fundamentals",
        "Data Structures & Algorithms",
        "AI Libraries Integration",
        "Real-world Projects"
      ]
    },
    2: {
      title: "Machine learning with AI",
      description: "AI/ML for automation & analysis",
      fullDescription: "Master machine learning algorithms and AI techniques for automation and data analysis. Build intelligent systems that can learn from data and make predictions.",
      duration: "8 weeks",
      languages: ["English", "Hindi"],
      image: "machinai.jpg",
      rating: "4.7",
      price: "₹6,999",
      instructor: "Prof. Alex Chen",
      level: "Intermediate to Advanced",
      modules: [
        "ML Algorithms",
        "Neural Networks",
        "Data Preprocessing",
        "Model Deployment"
      ]
    },
    10: {
      title: "100 Days of Code: Python Bootcamp",
      description: "Master Python by building 100 projects in 100 days.",
      fullDescription: "This comprehensive Python bootcamp takes you from absolute beginner to professional Python developer. You'll build 100 real-world projects covering web development, data science, automation, game development, and more.",
      duration: "56.5 hours",
      languages: ["English"],
      image: "/c1.png",
      rating: "4.7",
      price: "₹519",
      instructor: "Dr. Angela Yu",
      level: "All Levels",
      modules: [
        "Python Fundamentals & Setup",
        "100 Hands-on Projects",
        "Web Development with Flask/Django",
        "Data Science & Visualization",
        "Automation & Scripting"
      ]
    },
    // Add other courses as needed...
  };

  const course = courseData[id];

  if (!course) {
    return (
      <div className="course-details-container">
        <div className="error-message">
          <h2>Course not found</h2>
          <Link to="/" className="back-link">← Back to Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="course-details-container">
      <Link to="/" className="back-link">← Back to Courses</Link>
      
      <div className="course-details-header">
        <div className="course-image-large">
          <img src={course.image} alt={course.title} />
        </div>
        <div className="course-info">
          <span className="course-rating">Rating: {course.rating} ⭐</span>
          <h1>{course.title}</h1>
          <p className="course-instructor">By {course.instructor}</p>
          <p className="course-full-description">{course.fullDescription}</p>
          
          <div className="course-meta">
            <div className="meta-item">
              <strong>Duration:</strong> {course.duration}
            </div>
            <div className="meta-item">
              <strong>Level:</strong> {course.level}
            </div>
            <div className="meta-item">
              <strong>Instructor:</strong> {course.instructor}
            </div>
            <div className="meta-item">
              <strong>Languages:</strong> {course.languages.join(', ')}
            </div>
            <div className="meta-item price">
              <strong>Price:</strong> {course.price}
            </div>
          </div>
          
          <button className="enroll-button">Enroll Now</button>
        </div>
      </div>

      <div className="course-modules">
        <h2>Course Modules</h2>
        <ul>
          {course.modules.map((module, index) => (
            <li key={index}>{module}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CourseDetails;