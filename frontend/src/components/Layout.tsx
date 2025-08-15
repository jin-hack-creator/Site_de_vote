import React from 'react';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar variant="dark" expand="lg" style={{ backgroundColor: 'var(--primary-color)' }} sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/">YabetooPay Vote</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/" className="nav-link-custom">Accueil</Nav.Link>
              <Nav.Link as={Link} to="/reglement" className="nav-link-custom">Règlement</Nav.Link>
              <Nav.Link as={Link} to="/contact" className="nav-link-custom">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <footer className="app-footer mt-auto">
        <Container>
          <p className="mb-2">&copy; 2025 YabetooPay Vote. Tous droits réservés.</p>
          <div className="footer-links d-flex justify-content-center">
            <Link to="/reglement" className="footer-link px-2">Règlement</Link>
            <Link to="/mentions-legales" className="footer-link px-2">Mentions Légales</Link>
            <Link to="/contact" className="footer-link px-2">Contact</Link>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;