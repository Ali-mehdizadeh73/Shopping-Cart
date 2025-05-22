import React from "react";
import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart } from "react-icons/fa";
import "./Header.css";

function Header({ cartCount }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <Container>
        <Navbar.Brand href="/">فروشگاه من</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link href="/">خانه</Nav.Link>
            <Nav.Link href="/products">محصولات</Nav.Link>
            <Nav.Link href="/contact">تماس با ما</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/cart" className="cart-icon">
              <FaShoppingCart size={20} />
              <Badge bg="light" text="dark">{cartCount}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
