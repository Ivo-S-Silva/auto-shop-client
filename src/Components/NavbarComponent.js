import React, { useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import logo from "../assets/images/logo-image.png";

function NavbarComponent() {

  const {isLoggedIn, logOutUser} = useContext(AuthContext);

const renderNavbar = () => {
   return isLoggedIn && 
    <>
          <Nav className="me-auto" style={{height: "5vh", width: "100vh"}}>
          <NavDropdown title="Clients" id="nav-clients-dropdown">
            <NavDropdown.Item><NavLink to='/home/clients' className='text-dark' style={{textDecoration: "none"}}>Client List</NavLink></NavDropdown.Item>
            <NavDropdown.Item><NavLink to='/home/clients/create' className='text-dark' style={{textDecoration: "none"}}>Add New Client</NavLink></NavDropdown.Item>
          </NavDropdown>
          <Nav.Link href='/home/cars/list'>Car List</Nav.Link>
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
        {!isLoggedIn ? <Navbar.Brand href='/'><img src={logo} width='30' height='30' className="d-inline-block align-top" alt="Auto-Shop Logo"/> Auto-Shop</Navbar.Brand> : <Navbar.Brand href='/home'><img src={logo} width='30' height='30' className="d-inline-block align-top" alt="Auto-Shop Logo"/> Auto-Shop</Navbar.Brand> }
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          {renderNavbar()}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
