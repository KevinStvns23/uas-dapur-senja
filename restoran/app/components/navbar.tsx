"use client";

import { CSSProperties } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const navbarStyle = {
  backgroundColor: "#e05d1b",
  "--bs-navbar-color": "#ffffff",
  "--bs-navbar-hover-color": "#ffe0cc",
  "--bs-navbar-active-color": "#ffffff",
} as CSSProperties;

function NavbarComponent() {
  return (
    <Navbar expand="lg"  data-bs-theme="dark" style={navbarStyle}>
      <Container>
        <Navbar.Brand href="#">Dapur Senja</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarMenu" />
        <Navbar.Collapse id="navbarMenu">
          <Nav className="ms-auto">
            <Nav.Link href="#">Home</Nav.Link>
            <Nav.Link href="#">Menu</Nav.Link>
            <Nav.Link href="#">Promo & Info</Nav.Link>
            <Nav.Link href="/SistemBooking/reservasi">Reservation</Nav.Link>
            <Nav.Link href="#">Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;