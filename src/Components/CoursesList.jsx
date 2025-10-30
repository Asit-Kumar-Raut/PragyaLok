import CourseCard from "./CourseCard1";

function CoursesList() {
  return (
    <div className="d-flex flex-wrap justify-content-center">
      <CourseCard
        img="/Image1.png"
        title="100 Days of Code: The Complete Python Pro Bootcamp"
        teacher="Dr. Angela Yu"
        bestseller={true}
        rating={4.7}
        ratingsCount={397596}
        newPrice={519}
        oldPrice={3109}
        updatedDate="August 2025"
        totalHours="56.5"
        level="All Levels"
        description="Master Python by building 100 projects in 100 days. Learn data science, automation, build websites, games and apps!"
        consists={[
          "Master Python through 100 unique projects",
          "Learn automation, game, app, and web development",
          "Understand data science and machine learning with Python",
        ]}
        courseLink="/course/python-bootcamp"
        buyLink="/buy/python-bootcamp"
      />
    </div>
  );
}

export default CoursesList;
