import React, { useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavbarComponent() {

  const {isLoggedIn, isLoading, user, logOutUser} = useContext(AuthContext);


  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href='/'>Auto-Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <NavDropdown title="Clients" id="nav-clients-dropdown">
            <NavDropdown.Item><NavLink to='/clients' className='text-dark' style={{textDecoration: "none"}}>Client List</NavLink></NavDropdown.Item>
            <NavDropdown.Item><NavLink to='/clients/create' className='text-dark' style={{textDecoration: "none"}}>Add New Client</NavLink></NavDropdown.Item>
          </NavDropdown>
            
            <NavDropdown title="Cars" id="nav-cars-dropdown">
              <NavDropdown.Item><NavLink to='/cars' className='text-dark' style={{textDecoration: "none"}}>Car List</NavLink></NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {isLoggedIn && 
            <>
              <Button variant='outline-danger'onClick={() => {logOutUser()}}>Logout</Button>
            </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
