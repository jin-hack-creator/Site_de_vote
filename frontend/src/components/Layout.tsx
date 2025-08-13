import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar variant="dark" style={{ backgroundColor: 'var(--primary-color)' }}>
        <Container>
          <Navbar.Brand href="/">YabetooPay Vote</Navbar.Brand>
        </Container>
      </Navbar>

      <div className="hero-section">
        <Container>
          <h1>Le Grand Concours</h1>
          <p>Votez pour votre candidat favori et menez-le à la victoire !</p>
        </Container>
      </div>

      <main>
        <Outlet />
      </main>

      <footer className="app-footer">
        <Container>
          <p className="mb-2">&copy; 2025 YabetooPay Vote. Tous droits réservés.</p>
          <ul className="footer-links">
            <li><a href="#">Règlement</a></li>
            <li><a href="#">Mentions Légales</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </Container>
      </footer>
    </>
  );
};

export default Layout;
