import React from "react";
import { Link } from "react-router-dom";
import styles from "./CourseCard.module.css";

const CourseCard = ({ rating, title, description, duration, languages, image }) => {
  return (
    <>
      <div className={styles["course-card"]}>
        <div className={styles["course-header"]}>
          <div className={styles["image-container"]}>
            <img src={image} alt={title} className={styles["course-image"]} />
          </div>
          <div className={styles["content-section"]}>
            <div className={styles["rating-section"]}>
              <span className={styles["rating"]}># {rating}</span>
            </div>

            <h3 className={styles["course-title"]}>{title}</h3>
            <p className={styles["course-description"]}>{description}</p>

            <div className={styles["course-details"]}>
              <span className={styles["duration"]}>{duration}</span>
              {languages.length > 0 && (
                <>
                  <span className={styles["separator"]}>•</span>
                  <span className={styles["languages"]}>{languages.join(", ")}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className={styles["divider"]}></div>

        <div className={styles["know-more-section"]}>
          <a href="#" className={styles["know-more-link"]}>
            Know more
          </a>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
