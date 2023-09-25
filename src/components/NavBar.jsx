import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { CartWidget } from "./CartWidget";
import { Logo } from "./Logo";
import { Link } from 'react-router-dom';
export const NavBar =() => (

  <Navbar bg="dark" data-bs-theme="dark">
        <Container >
          <Navbar.Brand as={Link} to="/">  </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/"><Logo/> </Nav.Link>
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/category/remeras">Remeras</Nav.Link>
            <Nav.Link as={Link} to="/category/buzos">Buzos</Nav.Link>
            <Nav.Link as={Link} to="/category/pantalones">Pantalones</Nav.Link>
          </Nav> <CartWidget className="align-self-end"/>
        </Container>
      </Navbar>

);