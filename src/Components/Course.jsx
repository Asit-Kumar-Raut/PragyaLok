import CourseCard from "./CourseCard";
import "./course.css";

const course = () => {
  const courses = [
    {
      id: 1,
      rating: "4.5",
      title: "Programming in Python with AI",
      description: "Build apps using Python & AI tools.",
      duration: "6 weeks",
      languages: ["English,hindi"],
      image: "python.webp"
    },
   {
      id: 2,
      rating: "4.7",
      title: "Machine learning with AI",
      description: "AI/ML for automation & analysis",
      duration: "8 weeks",
      languages: ["english,hindi"],
      image: "machinai.jpg"
    },
    {
      id: 3,
      rating: "4.8",
      title: "Core Java with AI",
      description: "Build robust java apps with AI",
      duration: "8 weeks",
      languages: ["english,hindi"],
      image: "java.jpg"
    },
    {
      id: 4,
      rating: "4.9",
      title: "React with AI",
      description: "Build dynamic apps using AI",
      duration: "6 weeks",
      languages: ["english,hindi"],
      image: "reactai.png"
    },
    {
      id: 5,
      rating: "4.10",
      title: "Android App Development with AI",
      description: "Build mobile apps faster with AI",
      duration: "8 weeks",
      languages: ["english,hindi"],
      image: "androidai.png"
    },
     {
      id: 6,
      rating: "4.5",
      title: "prompt engineering for ai GecAI",
      description: "learn prompt writing for ai tools.",
      duration: "6 weeks",
      languages: ["English,hindi"],
      image: "promai.jpg"
    },
     {
      id: 7,
      rating: "4.5",
      title: "Generative AI",
      description: "build Ai-based apps & chatBot.",
      duration: "6 weeks",
      languages: ["English,hindi"],
      image: "genai.jpg"
    },
    {
      id: 8,
      rating: "4.5",
      title: "UI/UX design with Ai",
      description: "learn UI/UX design with AI tools.",
      duration: "6 weeks",
      languages: ["English,hindi"],
      image: "uiux.jpg"
    },
      {
      id: 9,
      rating: "4.5",
      title: "Graphic Design",
      description: "Design visual contact with tools.",
      duration: "6 weeks",
      languages: ["English,hindi"],
      image: "graphis.jpg"
    },
  ];

  return (
    <>
    <div className="course-container">
      {courses.map(course => (
        <CourseCard
          key={course.id}
          rating={course.rating}
          title={course.title}
          description={course.description}
          duration={course.duration}
          languages={course.languages}
          image={course.image}
        />
      ))}
    </div>
    
    </>
  );
};

export default course;
