import { Link } from "react-router-dom";
import { Navbar as BsNavbar, Container, Nav } from "react-bootstrap";
import "../../assets/styles/components/public/Navbar.scss";

function Navbar() {
  return (
    <BsNavbar expand="lg" className="navbar-sumaq">
      <Container>
        <BsNavbar.Brand as={Link} to="/">Sumaq</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/about">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/login">Ingresar</Nav.Link>
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
}

export default Navbar;
