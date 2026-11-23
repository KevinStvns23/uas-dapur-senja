"use client";

import Link from "next/link";
import { Container, Nav, Navbar } from "react-bootstrap";

export default function MainNavbar() {
    return (
        <Navbar expand="lg" fixed="top" className="main-navbar">
            <Container fluid="xxl">
                <Navbar.Brand as={Link} href="/" className="brand-logo">
                    Dapur Senja
                </Navbar.Brand>

                <Navbar.Toggle
                    aria-controls="main-navbar-menu"
                    aria-label="Buka menu navigasi"
                />

                <Navbar.Collapse id="main-navbar-menu">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} href="/">
                            Home
                        </Nav.Link>
                        <Nav.Link as={Link} href="/menu">
                            Menu
                        </Nav.Link>
                        <Nav.Link as={Link} href="/promo">
                            Promo & Info
                        </Nav.Link>
                        <Nav.Link as={Link} href="/reservation">
                            Reservation
                        </Nav.Link>
                        <Nav.Link as={Link} href="/account">
                            Account
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
