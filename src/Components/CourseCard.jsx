import "./CourseCard.css";
import { Link } from "react-router-dom";

const CourseCard = ({ id, rating, title, description, duration, languages, image }) => {
  return (
    <div className="course-card">
      <div className="course-header">
        <div className="image-container">
          <img src={image} alt={title} className="course-image" />
        </div>
        <div className="content-section">
          <div className="rating-section">
            <span className="rating"># {rating}</span>
          </div>
          
          <h3 className="course-title">{title}</h3>
          <p className="course-description">{description}</p>
          
          <div className="course-details">
            <span className="duration">{duration}</span>
            {languages.length > 0 && (
              <>
                <span className="separator">•</span>
                <span className="languages">
                  {languages.join(', ')}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="divider"></div>
      
      <div className="know-more-section">
        <Link to={`/course/${id}`} className="know-more-link">
          Know more
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;