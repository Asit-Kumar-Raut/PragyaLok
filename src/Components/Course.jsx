import React, { useState, useEffect } from "react";
import CourseCard from "./CourseCard";
import "./Course.css";
import { useSearchParams } from "react-router-dom";
import Footer from "./Footer";
const Course = () => {
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [searchParams, setSearchParams] = useSearchParams();

  const allCourses = [
    {
      id: 1,
      rating: "4.5",
      title: "Programming in Python with AI",
      description: "Build apps using Python & AI tools.",
      duration: "6 weeks",
      languages: ["English", "Hindi"],
      image: "python.webp",
      category: "AI"
    },
    {
      id: 2,
      rating: "4.7",
      title: "Machine learning with AI",
      description: "AI/ML for automation & analysis",
      duration: "8 weeks",
      languages: ["English", "Hindi"],
      image: "machinai.jpg",
      category: "AI"
    },
    {
      id: 3,
      rating: "4.8",
      title: "Core Java with AI",
      description: "Build robust java apps with AI",
      duration: "8 weeks",
      languages: ["English", "Hindi"],
      image: "java.jpg",
      category: "AI"
    },
    {
      id: 4,
      rating: "4.9",
      title: "React with AI",
      description: "Build dynamic apps using AI",
      duration: "6 weeks",
      languages: ["English", "Hindi"],
      image: "reactai.png",
      category: "AI"
    },
    {
      id: 5,
      rating: "4.10",
      title: "Android App Development with AI",
      description: "Build mobile apps faster with AI",
      duration: "8 weeks",
      languages: ["English", "Hindi"],
      image: "androidai.png",
      category: "AI"
    },
    {
      id: 6,
      rating: "4.5",
      title: "Prompt Engineering for AI GecAI",
      description: "Learn prompt writing for AI tools.",
      duration: "6 weeks",
      languages: ["English", "Hindi"],
      image: "promai.jpg",
      category: "AI"
    },
    {
      id: 7,
      rating: "4.5",
      title: "Generative AI",
      description: "Build AI-based apps & chatBot.",
      duration: "6 weeks",
      languages: ["English", "Hindi"],
      image: "genai.jpg",
      category: "AI"
    },
    {
      id: 8,
      rating: "4.5",
      title: "UI/UX design with AI",
      description: "Learn UI/UX design with AI tools.",
      duration: "6 weeks",
      languages: ["English", "Hindi"],
      image: "uiux.jpg",
      category: "DESIGN"
    },
    {
      id: 9,
      rating: "4.5",
      title: "Graphic Design",
      description: "Design visual contact with tools.",
      duration: "6 weeks",
      languages: ["English", "Hindi"],
      image: "graphis.jpg",
      category: "DESIGN"
    },
    {
      id: 10,
      rating: "4.7",
      title: "100 Days of Code: Python Bootcamp",
      description: "Master Python by building 100 projects in 100 days.",
      duration: "56.5 hours",
      languages: ["English"],
      image: "/c1.png",
      category: "PROGRAMMING"
    },
    {
      id: 11,
      rating: "4.8",
      title: "The Complete Web Development Bootcamp",
      description: "Learn HTML, CSS, JavaScript, Node.js, React, and MongoDB.",
      duration: "62 hours",
      languages: ["English"],
      image: "/c2.png",
      category: "WEB"
    },
    {
      id: 12,
      rating: "4.6",
      title: "Machine Learning A–Z: AI, Python & R",
      description: "Learn to build powerful machine learning models.",
      duration: "44 hours",
      languages: ["English"],
      image: "/c3.png",
      category: "AI"
    },
    {
      id: 13,
      rating: "4.9",
      title: "The Ultimate React JS Course",
      description: "Build interactive web apps using React, Redux, and modern hooks.",
      duration: "38 hours",
      languages: ["English"],
      image: "/c4.png",
      category: "WEB"
    },
    {
      id: 14,
      rating: "4.7",
      title: "Data Science Bootcamp 2025",
      description: "Become a data scientist by mastering Python, Pandas, NumPy.",
      duration: "58 hours",
      languages: ["English"],
      image: "/c5.png",
      category: "DATA"
    },
    {
      id: 15,
      rating: "4.7",
      title: "The Complete Java Developer Bootcamp",
      description: "Master Java programming from basics to advanced topics.",
      duration: "72 hours",
      languages: ["English"],
      image: "/c6.png",
      category: "PROGRAMMING"
    },
    {
      id: 16,
      rating: "4.8",
      title: "Ethical Hacking Masterclass 2025",
      description: "Learn ethical hacking from scratch.",
      duration: "45 hours",
      languages: ["English"],
      image: "/c7.png",
      category: "CYBERSECURITY"
    },
    {
      id: 17,
      rating: "4.5",
      title: "The Complete Android App Development Course",
      description: "Learn Android development using Kotlin.",
      duration: "54 hours",
      languages: ["English"],
      image: "/c8.png",
      category: "MOBILE"
    },
    {
      id: 18,
      rating: "4.6",
      title: "Artificial Intelligence Masterclass",
      description: "Learn to build AI models for self-driving cars.",
      duration: "48 hours",
      languages: ["English"],
      image: "/Image6.png",
      category: "AI"
    },
    {
      id: 19,
      rating: "4.6",
      title: "UI/UX Design from Scratch",
      description: "Master Figma, design systems, and user experience principles.",
      duration: "30 hours",
      languages: ["English"],
      image: "/c10.png",
      category: "DESIGN"
    },
    {
      id: 20,
      rating: "4.8",
      title: "The Complete SQL & Database Bootcamp",
      description: "Learn SQL from scratch with PostgreSQL and MySQL.",
      duration: "41 hours",
      languages: ["English"],
      image: "/c11.png",
      category: "DATA"
    },
    {
      id: 21,
      rating: "4.7",
      title: "Complete Cybersecurity & Network Fundamentals",
      description: "Understand cybersecurity, firewalls, VPNs.",
      duration: "52 hours",
      languages: ["English"],
      image: "/c12.png",
      category: "CYBERSECURITY"
    }
  ];

  const categories = [
    "ALL", "AI", "DESIGN", "PROGRAMMING", "WEB", "DATA", "CYBERSECURITY", "MOBILE"
  ];

  // ✅ Read category from URL parameter
  useEffect(() => {
    const urlCategory = searchParams.get('category');
    if (urlCategory) {
      const upperCaseCategory = urlCategory.toUpperCase();
      if (categories.includes(upperCaseCategory)) {
        setActiveFilter(upperCaseCategory);
      }
    }
  }, [searchParams]);

  const filteredCourses = activeFilter === "ALL"
    ? allCourses
    : allCourses.filter(course => course.category === activeFilter);

  const handleFilterClick = (category) => {
    setActiveFilter(category);
    if (category === "ALL") {
      setSearchParams({});
    } else {
      setSearchParams({ category: category.toLowerCase() });
    }
  };
  return (
    <>
      {/* Filter Buttons */}
      <div className="filter-container">
        <div className="d-flex gap-2 justify-content-center py-5 flex-wrap">
          {categories.map(category => (
            <button
              key={category}
              className={`btn rounded-pill px-4 ${
                activeFilter === category 
                  ? 'btn-primary' 
                  : getCategoryButtonClass(category)
              }`}
              type="button"
              onClick={() => handleFilterClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid - Only one container */}
      <div className="course-container">
        {filteredCourses.length > 0 ? (
          filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              id={course.id}
              rating={course.rating}
              title={course.title}
              description={course.description}
              duration={course.duration}
              languages={course.languages}
              image={course.image}
            />
          ))
        ) : (
          <div className="no-courses-message">
            <h3>No courses found in this category</h3>
            <p>Try selecting a different category or browse all courses.</p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

// ✅ Helper function for colored buttons
const getCategoryButtonClass = (category) => {
  switch (category) {
    case 'AI': return 'btn-secondary';
    case 'DESIGN': return 'btn-success';
    case 'PROGRAMMING': return 'btn-danger';
    case 'WEB': return 'btn-warning';
    case 'DATA': return 'btn-info';
    case 'CYBERSECURITY': return 'btn-dark';
    case 'MOBILE': return 'btn-light text-dark';
    default: return 'btn-outline-primary';
  }
};

export default Course;
