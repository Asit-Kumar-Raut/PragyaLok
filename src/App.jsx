import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./Components/Navigation";
import Home from "./Pages/Home";
import NotFound from "./Pages/Notfound";
import Header from "./Components/Header";
import Course from "./Components/Course";
import AuthFlow from "./Components/AuthFlow";
import Ai from "./Components/ai.jsx";
import Profile from "./Pages/Profile.jsx";
import CourseDetails from "./Components/CourseDetails";


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  // ✅ Check localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const token = localStorage.getItem("token");
    
    if (storedUser && token) {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  // ✅ When login succeeds
  const handleLogin = (userData) => {
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("token", "user-token"); // You should use the actual token from backend
    setIsLoggedIn(true);
    setUserData(userData);
    setShowAuth(false);
    sessionStorage.setItem('justLoggedIn', 'true');
  };

  // ✅ Clear on logout
  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
  };

  // ✅ Show auth flow
  const handleShowAuth = () => {
    setShowAuth(true);
  };

  // ✅ Hide auth flow
  const handleHideAuth = () => {
    setShowAuth(false);
  };

  return (
    <div className="App">
      <Header 
        isLoggedIn={isLoggedIn} 
        userData={userData} 
        onLogout={handleLogout}
        onShowAuth={handleShowAuth}
      />

      <main style={{ minHeight: 'calc(100vh - 120px)' }}>
        {showAuth ? (
          <AuthFlow onLogin={handleLogin} onCancel={handleHideAuth} />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Course />} />
            <Route path="/course/:id" element={<CourseDetails />} />

            {/* Auth route - redirect if already logged in */}
            <Route 
              path="/auth" 
              element={
                isLoggedIn ? 
                  <Navigate to="/profile" replace /> : 
                  <AuthFlow onLogin={handleLogin} />
              } 
            />

            {/* Protect AI page */}
            <Route
              path="/ai"
              element={isLoggedIn ? <Ai /> : <Navigate to="/auth" replace />}
            />

            {/* Profile page - protected */}
            <Route
              path="/profile"
              element={
                isLoggedIn ? 
                  <Profile /> : 
                  <Navigate to="/auth" replace />
              }
            />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        )}
      </main>

      <Navigation />
    </div>
  );
}

export default App;