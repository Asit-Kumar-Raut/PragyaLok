import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import NotFound from "./Pages/Notfound";
import Header from "./Components/Header";
import Course from "./Components/Course";
import Login from "./Pages/LoginPage";
import Ai from "./Components/ai.jsx";
import Profile from "./Pages/Profile.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Check localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setIsLoggedIn(true);
    }
  }, []);

  // ✅ When login succeeds, save data
  const handleLogin = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    setIsLoggedIn(true);
  };

  // ✅ Clear on logout
  const handleLogout = () => {
    localStorage.removeItem("userData");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Course />} />

        {/* Pass handleLogin to Login page */}
        <Route path="/Login" element={<Login onLogin={handleLogin} />} />

        {/* Protect AI page */}
        <Route
          path="/ai"
          element={isLoggedIn ? <Ai /> : <Navigate to="/Login" replace />}
        />

        {/* Profile will read from localStorage */}
        <Route path="/profile" element={<Profile />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Navigation />
    </div>
  );
}

export default App;
