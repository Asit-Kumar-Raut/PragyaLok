import React, { useState, useEffect, useRef } from "react";
import Footer from "../Components/Footer";
import {
  Container,
  Row,
  Col,
  Card,
  ProgressBar,
  Button,
  Form,
  Modal,
  Alert,
  Badge
} from "react-bootstrap";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "Lifelong Learner in AI & ML",
    photo: "/avatar.jpg",
  });

  const [courses] = useState([
    { title: "Python with AI", progress: 80, category: "AI" },
    { title: "Machine Learning", progress: 60, category: "AI" },
    { title: "Web Development", progress: 45, category: "Web" },
  ]);

  const [editing, setEditing] = useState(false);
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [loadingPhoto, setLoadingPhoto] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const fileInputRef = useRef(null);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(prev => ({ 
        ...prev, 
        ...userData,
        photo: userData.photo || "/avatar.jpg" // Default photo if none exists
      }));
      
      const justLoggedIn = sessionStorage.getItem('justLoggedIn');
      if (justLoggedIn) {
        setShowWelcome(true);
        setTimeout(() => setShowWelcome(false), 5000);
        sessionStorage.removeItem('justLoggedIn');
      }
    }
  }, []);

  const handleEditToggle = () => {
    if (editing) {
      handleSaveProfile();
    }
    setEditing(!editing);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    localStorage.setItem("userData", JSON.stringify(user));
    setSaveMessage("Profile updated successfully! ✅");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  const handlePhotoClick = () => {
    fileInputRef.current?.click();
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setSaveMessage("❌ Please select an image file");
        setTimeout(() => setSaveMessage(""), 3000);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setSaveMessage("❌ Image size should be less than 5MB");
        setTimeout(() => setSaveMessage(""), 3000);
        return;
      }

      setLoadingPhoto(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        const updated = { ...user, photo: reader.result };
        setUser(updated);
        localStorage.setItem("userData", JSON.stringify(updated));
        setLoadingPhoto(false);
        setShowPhotoModal(false);
        setSaveMessage("✅ Profile photo updated successfully!");
        setTimeout(() => setSaveMessage(""), 3000);
      };
      reader.onerror = () => {
        setLoadingPhoto(false);
        setSaveMessage("❌ Failed to upload image");
        setTimeout(() => setSaveMessage(""), 3000);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetPhoto = (photoURL) => {
    setLoadingPhoto(true);
    setTimeout(() => {
      const updated = { ...user, photo: photoURL };
      setUser(updated);
      localStorage.setItem("userData", JSON.stringify(updated));
      setLoadingPhoto(false);
      setShowPhotoModal(false);
      setSaveMessage("✅ Profile photo updated!");
      setTimeout(() => setSaveMessage(""), 3000);
    }, 600);
  };

  const removeProfilePhoto = () => {
    const updated = { ...user, photo: "/avatar.jpg" };
    setUser(updated);
    localStorage.setItem("userData", JSON.stringify(updated));
    setSaveMessage("✅ Profile photo removed!");
    setTimeout(() => setSaveMessage(""), 3000);
  };

  return (
    <>
    <Container className="profile-container">
      {/* Welcome Alert */}
      {showWelcome && (
        <Alert variant="success" className="text-center">
          <strong>🎉 Welcome to your profile, {user.name || 'User'}!</strong> Let's build your career together!
        </Alert>
      )}

      {/* Save Message */}
      {saveMessage && (
        <Alert variant={saveMessage.includes("❌") ? "danger" : "success"} className="text-center">
          {saveMessage}
        </Alert>
      )}

      {/* Profile Header */}
      <Card className="profile-header-card shadow-sm">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col md={3} className="text-center">
              <div className="profile-pic-container">
                <div className="profile-picture-wrapper">
                  <img 
                    src={user.photo} 
                    alt="Profile" 
                    className="profile-picture"
                    onClick={() => setShowPhotoModal(true)}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/150/007bff/ffffff?text=UP";
                    }}
                  />
                  
                  {loadingPhoto && (
                    <div className="loader-overlay">
                      <div className="loader"></div>
                    </div>
                  )}

                  <div className="profile-overlay" onClick={() => setShowPhotoModal(true)}>
                    <span>📷</span>
                  </div>
                </div>

                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handlePhotoUpload}
                  accept="image/*"
                  style={{ display: 'none' }}
                />

                <div className="profile-actions mt-3">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={handlePhotoClick}
                    className="me-2"
                  >
                    Upload Photo
                  </Button>
                  {user.photo !== "/avatar.jpg" && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={removeProfilePhoto}
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </Col>

            <Col md={9}>
              {editing ? (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Full Name</strong></Form.Label>
                    <Form.Control
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Email Address</strong></Form.Label>
                    <Form.Control
                      name="email"
                      type="email"
                      value={user.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Phone Number</strong></Form.Label>
                    <Form.Control
                      name="phone"
                      value={user.phone}
                      onChange={handleChange}
                      placeholder="Enter your phone number"
                    />
                  </Form.Group>
                  
                  <Form.Group className="mb-3">
                    <Form.Label><strong>Bio</strong></Form.Label>
                    <Form.Control
                      name="bio"
                      as="textarea"
                      rows={3}
                      value={user.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                    />
                  </Form.Group>
                </Form>
              ) : (
                <>
                  <div className="d-flex justify-content-between align-items-start">
                    <div>
                      <h1 className="profile-name">{user.name || "Guest User"}</h1>
                      <p className="profile-bio">{user.bio}</p>
                    </div>
                    <Badge bg="primary" className="profile-badge">Learner</Badge>
                  </div>
                  
                  <div className="profile-details mt-3">
                    <div className="profile-detail-item">
                      <strong>📧 Email:</strong> {user.email || "No email provided"}
                    </div>
                    <div className="profile-detail-item">
                      <strong>📞 Phone:</strong> {user.phone || "No phone provided"}
                    </div>
                    <div className="profile-detail-item">
                      <strong>🎯 Member Since:</strong> {new Date().toLocaleDateString()}
                    </div>
                  </div>
                </>
              )}
              
              <Button
                variant={editing ? "success" : "primary"}
                className="mt-3"
                onClick={handleEditToggle}
              >
                {editing ? "💾 Save Changes" : "✏️ Edit Profile"}
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* My Courses Section */}
      <Card className="mt-4 p-3 shadow-sm">
        <h4 className="section-title">📚 My Learning Journey</h4>
        {courses.map((course, index) => (
          <div key={index} className="course-item">
            <div className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{course.title}</strong>
                <Badge bg="secondary" className="ms-2">{course.category}</Badge>
              </div>
              <span className="progress-text">{course.progress}%</span>
            </div>
            <ProgressBar
              now={course.progress}
              label={`${course.progress}%`}
              className="mt-2"
              variant={course.progress > 70 ? "success" : course.progress > 40 ? "warning" : "primary"}
            />
          </div>
        ))}
      </Card>

      {/* Change Photo Modal */}
      <Modal
        show={showPhotoModal}
        onHide={() => setShowPhotoModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>🖼️ Change Profile Picture</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {/* Current Photo Preview */}
          <div className="current-photo-preview mb-4">
            <h6>Current Photo:</h6>
            <img 
              src={user.photo} 
              alt="Current" 
              className="preview-image"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/100/007bff/ffffff?text=UP";
              }}
            />
          </div>

          {/* Upload from device */}
          <div className="upload-section mb-4">
            <h6>Upload from your device:</h6>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handlePhotoUpload}
              className="form-control"
            />
            <small className="text-muted">Max size: 5MB • Supported: JPG, PNG, GIF</small>
          </div>

          <hr />

          {/* Preset Avatars */}
          <h6>Or choose from our avatars:</h6>
          <div className="preset-container">
            {[
              "https://via.placeholder.com/100/007bff/ffffff?text=U1",
              "https://via.placeholder.com/100/28a745/ffffff?text=U2", 
              "https://via.placeholder.com/100/dc3545/ffffff?text=U3",
              "https://via.placeholder.com/100/6f42c1/ffffff?text=U4",
              "https://via.placeholder.com/100/fd7e14/ffffff?text=U5",
              "https://via.placeholder.com/100/20c997/ffffff?text=U6"
            ].map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`avatar-${i}`}
                className="preset-img"
                onClick={() => handlePresetPhoto(img)}
              />
            ))}
          </div>

          {loadingPhoto && (
            <div className="text-center mt-3">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Updating...</span>
              </div>
              <p className="mt-2">Updating profile picture...</p>
            </div>
          )}
        </Modal.Body>
      </Modal>
  
    </Container>
    <Footer />
    </>
  );
}

export default Profile;