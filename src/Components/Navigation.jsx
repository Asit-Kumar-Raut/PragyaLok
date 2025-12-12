import React from "react";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Navigation.css";
import Course from "./Course.jsx";

function Navigation() {
  return (
    <Navbar
      bg="dark"
      variant="dark"
      className="shadow-sm fixed-bottom custom-bottom-nav"
      style={{
        zIndex: 1000,
        borderTop: "1px solid #444",
      }}
    >
      <div className="nav-wrapper">
        {/* Left Side */}
        <div className="nav-left">
          <Nav.Item>
            <Nav.Link as={Link} to="/" className="nav-item-link text-center">
              🏠
              <div className="nav-label">Home</div>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to="/Courses" className="nav-item-link text-center">
              📚
              <div className="nav-label">Courses</div>
            </Nav.Link>
          </Nav.Item>
        </div>

        {/* Center Floating Button */}
        <div className="center-btn">
          <Nav.Link as={Link} to="/ai" className="nav-item-link text-center">
            <img src="/upanayana.jpg" alt="Buzz Box" />
          </Nav.Link>
           <div className="nav-label">Upanayana</div>
        </div>

        {/* Right Side */}
        <div className="nav-right">
          <Nav.Item>
            <Nav.Link as={Link} to="/Contact" className="nav-item-link text-center">
              👥
              <div className="nav-label">contact</div>
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={Link} to="/profile" className="nav-item-link text-center">
              👤
              <div className="nav-label">Me</div>
            </Nav.Link>
          </Nav.Item>
        </div>
      </div>
    </Navbar>
  );
}

export default Navigation;
