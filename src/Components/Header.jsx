import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom'

function Header() {
  return (
   <Navbar expand="lg" bg="light" data-bs-theme="light" className="shadow-sm"   style={{ zIndex: 1000,boxShadow:"10px 0px black"}}>
      <Container fluid>
        <Navbar.Brand href="/">  <img src="/logo.png" alt="logo" style={{height:50}} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px',objectFit: 'contain',  zIndex: 1002 }}
            navbarScroll
          >
          
            {/* <Nav.Link href="#" disabled>
              Link
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success" className="mx-2">Search</Button>
            <Link to={"/Login"}>
             <Button variant="outline-primary" className="mx-2" style={{ whiteSpace: 'nowrap' }}>Sign In</Button> 
            </Link>
           
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;