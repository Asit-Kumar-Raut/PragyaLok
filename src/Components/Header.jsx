import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useState } from "react";

function Header({ isLoggedIn, userData, onLogout, onShowAuth }) {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  return (
    <Navbar expand="lg" bg="light" className="shadow-sm" style={{ zIndex: 1000 }}>
      <Container fluid>
        <Navbar.Brand href="/" className="me-3">
          <img src="/mainlogo.png" alt="logo" style={{ height: 50 }} />
        </Navbar.Brand>
        
        {/* Mobile Search Toggle Button */}
        <Button
          variant="outline-secondary"
          className="d-lg-none me-2"
          onClick={() => setShowMobileSearch(!showMobileSearch)}
          style={{ whiteSpace: "nowrap" }}
        >
          🔍
        </Button>

        <Navbar.Toggle aria-controls="navbarScroll" />
        
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
       
          </Nav>

          {/* Desktop Search & Auth */}
          <div className="d-none d-lg-flex align-items-center">
            <Form className="d-flex me-3">
              <Form.Control 
                type="search" 
                placeholder="Search courses..." 
                className="me-2"
                style={{ minWidth: "250px" }}
                aria-label="Search" 
              />
              <Button variant="outline-success">Search</Button>
            </Form>

            {isLoggedIn ? (
              <>
                <span className="mx-2 text-primary fw-bold">
                  Welcome, {userData?.name || userData?.username || 'User'}!
                </span>
                <Link to="/profile" className="mx-2">
                
                </Link>
                <Button 
                  variant="outline-danger" 
                  className="mx-2" 
                  onClick={onLogout} 
                  style={{ whiteSpace: "nowrap" }}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <Button 
                variant="outline-primary" 
                onClick={onShowAuth}
                style={{ whiteSpace: "nowrap" }}
              >
                Sign In / Register
              </Button>
            )}
          </div>

          {/* Mobile Auth Only (without search) */}
          <div className="d-lg-none mt-2">
            {isLoggedIn ? (
              <div className="d-flex flex-wrap gap-2">
                <span className="text-primary fw-bold w-100 text-center">
                  Hi, {userData?.name || userData?.username || 'User'}!
                </span>
                <Link to="/profile" className="flex-fill">
                  <Button variant="outline-info" size="sm" className="w-100">
                    Profile
                  </Button>
                </Link>
                <Button 
                  variant="outline-danger" 
                  size="sm"
                  className="flex-fill"
                  onClick={onLogout}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button 
                variant="outline-primary" 
                size="sm" 
                className="w-100"
                onClick={onShowAuth}
              >
                Sign In / Register
              </Button>
            )}
          </div>
        </Navbar.Collapse>
      </Container>

      {/* Mobile Search Bar - Full Width */}
      {showMobileSearch && (
        <div className="w-100 p-3 bg-light border-top d-lg-none">
          <Form className="d-flex">
            <Form.Control 
              type="search" 
              placeholder="Search courses..." 
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="me-2">
              Search
            </Button>
            <Button 
              variant="outline-secondary" 
              onClick={() => setShowMobileSearch(false)}
            >
              ✕
            </Button>
          </Form>
        </div>
      )}
    </Navbar>
  );
}

export default Header;