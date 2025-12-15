import React, { useState, useEffect } from "react";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 800); // 0.8s fade-in
    return () => clearTimeout(timer);
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.includes("@")) newErrors.email = "Enter a valid email";
    if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Enter 10-digit phone number";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 chars";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // ✅ Pass formData to App.js
      onLogin(formData);

      document.getElementById("para").innerHTML = `Logged in Successfully! 🪂`;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="login-container">
        <img className="bg-image" src="/loginbg.png" alt="background image" />

        {showForm && (
          <div className="form-overlay">
            <form className="login-form" onSubmit={handleSubmit}>
              <h2>Welcome Back</h2>
              <p className="subtitle">Login to continue your journey</p>

              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span>{errors.name}</span>}
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span>{errors.email}</span>}
              </div>

              <div className="form-group">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span>{errors.phone}</span>}
              </div>

              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && <span>{errors.password}</span>}
              </div>

              <button type="submit" className="login-btn">
                Login
              </button>
              <br />
              <br />
              <p id="para" style={{ color: "red" }}></p>
            </form>
          </div>
        )}
      </div>
      <div style={{ height: "5vh" }}></div>
    </div>
  );
};

export default LoginPage;
