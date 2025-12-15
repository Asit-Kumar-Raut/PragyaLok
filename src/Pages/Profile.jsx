import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import styles from "./Profile.module.css";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "Lifelong Learner in AI & ML 🚀",
    photo: "/avatar.jpg",
  });

  const [courses] = useState([
    { title: "React for Beginners", progress: 80, category: "Web Dev" },
    { title: "Machine Learning 101", progress: 60, category: "AI" },
    { title: "Cloud Fundamentals", progress: 45, category: "Cloud" },
  ]);

  const [editing, setEditing] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);

  // ✅ Load user data from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("userData");
      if (storedUser) {
        setUser((prev) => ({ ...prev, ...JSON.parse(storedUser) }));
      }
    } catch (err) {
      console.error("Error loading user data:", err);
    }
  }, []);

  // ✅ Save changes
  const handleChange = (e) => {
    const updated = { ...user, [e.target.name]: e.target.value };
    setUser(updated);
    localStorage.setItem("userData", JSON.stringify(updated));
  };

  // ✅ Toggle edit mode
  const handleEditToggle = () => {
    setEditing(!editing);
  };

  // ✅ Handle image upload
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoadingPhoto(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = { ...user, photo: reader.result };
        setUser(updated);
        localStorage.setItem("userData", JSON.stringify(updated));
        setLoadingPhoto(false);
        setShowPhotoModal(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle preset photo selection
  const handlePresetPhoto = (photoURL) => {
    setLoadingPhoto(true);
    setTimeout(() => {
      const updated = { ...user, photo: photoURL };
      setUser(updated);
      localStorage.setItem("userData", JSON.stringify(updated));
      setLoadingPhoto(false);
      setShowPhotoModal(false);
    }, 500);
  };


  return (
    <Container className={`${styles.profileContainer} mt-5`}>
      {/* ================== Profile Header ================== */}
      <Card className={`${styles.profileHeader} shadow-lg`}>
        <Row className="align-items-center">
          <Col md={3} className="text-center">
            <div className={styles.profilePicContainer}>
              <img src={user.photo} alt="User" className={styles.profilePic} />

              {loadingPhoto && (
                <div className={styles.loaderOverlay}>
                  <div className={styles.loader}></div>
                </div>
              )}

              <button
                className={styles.changePhoto}
                onClick={() => setShowPhotoModal(true)}
              >
                Change Photo
              </button>
            </div>
          </Col>

          <Col md={9}>
            {editing ? (
              <Form>
                <Form.Group className="mb-2">
                  <Form.Control
                    name="name"
                    value={user.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    name="email"
                    value={user.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                  />
                </Form.Group>
                <Form.Group className="mb-2">
                  <Form.Control
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
                    placeholder="Enter phone"
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    name="bio"
                    as="textarea"
                    rows={2}
                    value={user.bio}
                    onChange={handleChange}
                    placeholder="Write your bio"
                  />
                </Form.Group>
              </Form>
            ) : (
              <>
                <h2>{user.name || "Guest User"}</h2>
                <p className="text-muted">{user.bio}</p>
                <p>
                  {user.email || "No email"} • {user.phone || "No phone"}
                </p>
              </>
            )}

            <div className="mt-3 d-flex gap-2">
              <Button
                variant={editing ? "success" : "primary"}
                onClick={handleEditToggle}
              >
                {editing ? "Save" : "Edit Profile"}
              </Button>
            </div>
          </Col>
        </Row>
      </Card>

      {/* ================== My Courses ================== */}
      <Card className="mt-4 p-3 shadow-sm">
        <h4 className={styles.sectionTitle}>📚 My Courses</h4>
        {courses.map((course, index) => (
          <div key={index} className={styles.courseItem}>
            <div className="d-flex justify-content-between">
              <strong>{course.title}</strong>
              <span className={styles.categoryTag}>{course.category}</span>
            </div>
            <ProgressBar
              now={course.progress}
              label={`${course.progress}%`}
              className="mt-1"
            />
          </div>
        ))}
      </Card>

      {/* ================== Change Photo Modal ================== */}
      <Modal
        show={showPhotoModal}
        onHide={() => setShowPhotoModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Profile Photo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h6>Choose from your device:</h6>
          <input type="file" accept="image/*" onChange={handlePhotoUpload} />

          <hr />
          <h6>Or pick one of these:</h6>
          <div className={styles.presetContainer}>
            {["/avatar1.jpg", "/avatar2.jpg", "/avatar3.png", "/avatar4.jpg"].map(
              (img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`avatar-${i}`}
                  className={styles.presetImg}
                  onClick={() => handlePresetPhoto(img)}
                  style={{height:"40px",marginLeft:"10px"}}
                />
              )
            )}
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Profile;
