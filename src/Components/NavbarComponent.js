import React, { useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

function NavbarComponent() {

  const {isLoggedIn, logOutUser} = useContext(AuthContext);

const renderNavbar = () => {
   return isLoggedIn && 
    <>
          <Nav className="me-auto">
          <NavDropdown title="Clients" id="nav-clients-dropdown">
            <NavDropdown.Item><NavLink to='/home/clients' className='text-dark' style={{textDecoration: "none"}}>Client List</NavLink></NavDropdown.Item>
            <NavDropdown.Item><NavLink to='/home/clients/create' className='text-dark' style={{textDecoration: "none"}}>Add New Client</NavLink></NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href='/home/cars'>Car List</Nav.Link>
          <Nav.Link href='/home/services'>Service List</Nav.Link>
          </Nav>
          <Nav>
            {isLoggedIn && 
            <>
              <Button variant='danger'onClick={() => {logOutUser()}}>Logout</Button>
            </>}
          </Nav>
    </>}




  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        {!isLoggedIn ? <Navbar.Brand href='/'>Auto-Shop</Navbar.Brand> : <Navbar.Brand href='/home'>Auto-Shop</Navbar.Brand> }
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {renderNavbar()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
