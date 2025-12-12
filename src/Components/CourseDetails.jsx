import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './CourseDetails.css';
import Footer from './Footer';

const CourseDetails = () => {
  const { id } = useParams();
  
  const courseData = {
  1: {
    title: "Programming in Python with AI",
    description: "Build apps using Python & AI tools.",
    fullDescription: "Learn Python programming from scratch and integrate AI capabilities...",
    duration: "6 weeks",
    languages: ["English", "Hindi"],
    image: "python.webp",
    rating: "4.5",
    price: "₹199",
    instructor: "Prof. Balaraman Ravindran (IIT Madras)",
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
    fullDescription: "Master machine learning algorithms...",
    duration: "8 weeks",
    languages: ["English", "Hindi"],
    image: "machinai.jpg",
    rating: "4.7",
    price: "₹199",
    instructor: "Prof. Sudeshna Sarkar (IIT Kharagpur)",
    level: "Intermediate to Advanced",
    modules: [
      "ML Algorithms",
      "Neural Networks",
      "Data Preprocessing",
      "Model Deployment"
    ]
  },

  3: {
    title: "Build Robust Java Apps with AI",
    description: "Java development with AI-powered enhancements",
    fullDescription: "Learn to build high-performance Java apps...",
    duration: "10 weeks",
    languages: ["English", "Hindi"],
    image: "javaai.jpg",
    rating: "4.8",
    price: "₹199",
    instructor: "Prof. Sandeep Shukla (IIT Kanpur)",
    level: "Intermediate",
    modules: [
      "Core Java & OOP Concepts",
      "Spring Boot Framework",
      "AI Integration with Java",
      "Automation & Deployment"
    ]
  },

  4: {
    title: "React with AI",
    description: "Modern React development with AI",
    fullDescription: "Learn to build React apps enhanced with AI...",
    duration: "6 weeks",
    languages: ["English", "Hindi"],
    image: "",
    rating: "4.8",
    price: "₹199",
    instructor: "Prof. Brejesh Lall (IIT Delhi)",
    level: "Beginner to Advanced",
    modules: [
      "React Basics & Hooks",
      "Component Architecture",
      "AI API Integration",
      "Building Smart UI"
    ]
  },

  5: {
    title: "Android App Development with AI",
    description: "Build Android apps powered by AI",
    fullDescription: "Master Android with Kotlin + AI...",
    duration: "9 weeks",
    languages: ["English", "Hindi"],
    image: "",
    rating: "4.7",
    price: "₹199",
    instructor: "Prof. Janakiraman Ramamurthy (IIT Madras)",
    level: "Intermediate",
    modules: [
      "Android Fundamentals",
      "Kotlin Programming",
      "AI Integration in Apps",
      "Deploying Android Apps"
    ]
  },

  6: {
    title: "Prompt Engineering for AI GecAI",
    description: "Master advanced prompt engineering",
    fullDescription: "Learn prompt design & optimization...",
    duration: "4 weeks",
    languages: ["English"],
    image: "",
    rating: "4.9",
    price: "₹199",
    instructor: "Prof. Andrew Thangaraj (IIT Madras)",
    level: "Beginner to Professional",
    modules: [
      "Prompt Basics",
      "Prompt Patterns & Frameworks",
      "AI Optimization",
      "Building AI Workflows"
    ]
  },

  7: {
    title: "Build AI-based Apps & ChatBot",
    description: "Create intelligent apps and chatbots",
    fullDescription: "Learn NLP, ML and chatbot building...",
    duration: "7 weeks",
    languages: ["English", "Hindi"],
    image: "",
    rating: "4.8",
    price: "₹199",
    instructor: "Prof. Niloy Ganguly (IIT Kharagpur)",
    level: "Intermediate",
    modules: [
      "NLP Basics",
      "Chatbot Logic",
      "AI API Integration",
      "Deploying AI Applications"
    ]
  },

  8: {
    title: "Learn UI/UX Design with AI Tools",
    description: "Modern UI/UX design enhanced with AI",
    fullDescription: "Learn UI/UX fundamentals + AI tools...",
    duration: "5 weeks",
    languages: ["English"],
    image: "",
    rating: "4.6",
    price: "₹199",
    instructor: "Prof. Hima Varsha (IIT Madras)",
    level: "Beginner",
    modules: [
      "UI/UX Fundamentals",
      "AI-Assisted Wireframing",
      "Prototyping with AI",
      "Design Systems"
    ]
  },

  9: {
    title: "Design Visual Content with AI Tools",
    description: "AI-powered graphic designing",
    fullDescription: "Poster, banner, ad design using AI...",
    duration: "4 weeks",
    languages: ["English", "Hindi"],
    image: "",
    rating: "4.7",
    price: "₹199",
    instructor: "Prof. Rina Panigrahi (IIT Kharagpur)",
    level: "Beginner",
    modules: [
      "Design Basics",
      "AI Graphic Tools",
      "Branding & Layouts",
      "Creative Automation"
    ]
  },

  10: {
    title: "100 Days of Code: Python Bootcamp",
    description: "Master Python with 100 projects",
    fullDescription: "From beginner to advanced Python...",
    duration: "56.5 hours",
    languages: ["English"],
    image: "/c1.png",
    rating: "4.7",
    price: "₹199",
    instructor: "Dr. Angela Yu",
    level: "All Levels",
    modules: [
      "Python Fundamentals & Setup",
      "100 Hands-on Projects",
      "Web Development",
      "Automation & Scripting"
    ]
  },

  11: {
    title: "The Complete Web Development Bootcamp",
    description: "Full-stack web development",
    fullDescription: "Learn HTML, CSS, JS, Node, MongoDB...",
    duration: "12 weeks",
    languages: ["English", "Hindi"],
    image: "",
    rating: "4.9",
    price: "₹199",
    instructor: "Prof. Supratim Biswas (IIT Bombay)",
    level: "Beginner to Advanced",
    modules: [
      "Frontend Development",
      "Backend Development",
      "Database Management",
      "Full-Stack Projects"
    ]
  },

  12: {
    title: "Machine Learning A–Z: AI, Python & R",
    description: "Complete machine learning",
    fullDescription: "ML algorithms, Python & R...",
    duration: "10 weeks",
    languages: ["English"],
    image: "",
    rating: "4.8",
    price: "₹199",
    instructor: "Prof. Manindra Agrawal (IIT Kanpur)",
    level: "Intermediate",
    modules: [
      "ML Basics",
      "Python & R for ML",
      "Supervised Models",
      "Model Evaluation"
    ]
  },

  13: {
    title: "The Ultimate React JS Course",
    description: "Complete React mastery",
    fullDescription: "Hooks, components, Redux...",
    duration: "8 weeks",
    languages: ["English", "Hindi"],
    image: "",
    rating: "4.9",
    price: "₹199",
    instructor: "Prof. Kavi Arya (IIT Bombay)",
    level: "Intermediate",
    modules: [
      "React Core",
      "React Hooks",
      "Redux & State Management",
      "React Projects"
    ]
  },

  14: {
    title: "Data Science Bootcamp 2025",
    description: "Complete data science training",
    fullDescription: "Python, ML, Deep Learning...",
    duration: "14 weeks",
    languages: ["English"],
    image: "",
    rating: "4.8",
    price: "₹199",
    instructor: "Prof. Ashok Jhunjhunwala (IIT Madras)",
    level: "Intermediate to Advanced",
    modules: [
      "Python for Data Science",
      "Statistics & Analytics",
      "Machine Learning",
      "Deep Learning"
    ]
  },

  15: {
    title: "The Complete Java Developer Bootcamp",
    description: "Become a professional Java developer",
    fullDescription: "Java basics to advanced...",
    duration: "10 weeks",
    languages: ["English", "Hindi"],
    image: "",
    rating: "4.7",
    price: "₹199",
    instructor: "Prof. Tarun Kant (IIT Kanpur)",
    level: "Beginner to Advanced",
    modules: [
      "Core Java",
      "OOP Concepts",
      "Spring Boot",
      "Java Projects"
    ]
  },

  16: {
    title: "Ethical Hacking Masterclass 2025",
    description: "Cybersecurity & hacking",
    fullDescription: "Pen testing, network security...",
    duration: "9 weeks",
    languages: ["English", "Hindi"],
    image: "",
    rating: "4.9",
    price: "₹199",
    instructor: "Prof. Mukesh Sharma (IIT Kanpur)",
    level: "Intermediate",
    modules: [
      "Cybersecurity Basics",
      "Network Attacks",
      "Penetration Testing",
      "Real Hacking Labs"
    ]
  },

  17: {
    title: "The Complete Android App Development Course",
    description: "Learn Android from scratch",
    fullDescription: "Kotlin, Java, APIs, Firebase...",
    duration: "10 weeks",
    languages: ["English", "Hindi"],
    image: "",
    rating: "4.8",
    price: "₹199",
    instructor: "Prof. Subrat Kar (IIT Delhi)",
    level: "Beginner",
    modules: [
      "Kotlin & Java",
      "UI/UX for Android",
      "API Integration",
      "App Deployment"
    ]
  },

  18: {
    title: "Artificial Intelligence Masterclass",
    description: "Complete AI mastery",
    fullDescription: "AI, ML, DL, RL...",
    duration: "12 weeks",
    languages: ["English"],
    image: "",
    rating: "4.9",
    price: "₹199",
    instructor: "Prof. Balaraman Ravindran (IIT Madras)",
    level: "Advanced",
    modules: [
      "AI Fundamentals",
      "Machine Learning",
      "Neural Networks",
      "Reinforcement Learning"
    ]
  },

  19: {
    title: "UI/UX Design from Scratch",
    description: "Learn interface design",
    fullDescription: "Typography, colors, wireframes...",
    duration: "6 weeks",
    languages: ["English"],
    image: "",
    rating: "4.6",
    price: "₹199",
    instructor: "Prof. Santosh Biswas (IIT Delhi)",
    level: "Beginner",
    modules: [
      "Design Theory",
      "Wireframes",
      "Prototyping",
      "User Testing"
    ]
  },

  20: {
    title: "The Complete SQL & Database Bootcamp",
    description: "Master SQL & DB systems",
    fullDescription: "MySQL, PostgreSQL, queries...",
    duration: "7 weeks",
    languages: ["English", "Hindi"],
    image: "",
    rating: "4.8",
    price: "₹199",
    instructor: "Prof. Harsh Gupta (IIT Bombay)",
    level: "Beginner to Intermediate",
    modules: [
      "SQL Basics",
      "Advanced Queries",
      "Database Design",
      "Optimization"
    ]
  },

  21: {
    title: "Complete Cybersecurity & Network Fundamentals",
    description: "Cybersecurity & networking basics",
    fullDescription: "Threats, protection, firewalls...",
    duration: "8 weeks",
    languages: ["English", "Hindi"],
    image: "",
    rating: "4.7",
    price: "₹199",
    instructor: "Prof. Karan Singh (IIT Madras)",
    level: "Beginner",
    modules: [
      "Networking Basics",
      "Cybersecurity Essentials",
      "Threat Analysis",
      "Security Tools"
    ]
  }




    // Add data for other course IDs as needed
  };

  const course = courseData[id];

  if (!course) {
    return (
      <div className="course-details-container">
        <div className="error-message">
          <h2>Course not found</h2>
          <Link to="/courses" className="back-link">← Back to Courses</Link>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="course-details-container">
      <Link to="/courses" className="back-link">← Back to Courses</Link>
      
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
    <Footer />
    </>
  );
};

export default CourseDetails;