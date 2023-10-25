// components/Layout.js
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Navbar, Container, Nav , NavDropdown  } from 'react-bootstrap';   
import { useState, useEffect } from 'react'

export default function NavBar() {
   const [Menus , setMenus ] = useState([]);
   useEffect(() => {
    fetch('http://localhost:3000/api/metadata')
      .then((res) => res.json())
      .then((data) => {
        setMenus(data)
      }) .catch((error) => console.error('Error fetching menu data:', error));
  }, [])

return (
    <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">  
            <Container>  
            <Navbar.Brand href="/">ERP Forms</Navbar.Brand>  
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />  
            <Navbar.Collapse id="responsive-navbar-nav">  
                <Nav className="me-auto">   
                    <NavDropdown title="Forms" id="basic-nav-dropdown">
                        {Menus.map((m) => (         
                            <NavDropdown.Item key={m.Pageid} href={`/pagebuilder/${m.PageRoute}`}>{m.PageName}</NavDropdown.Item>
                        ))}            
                    </NavDropdown>
                </Nav>  
                <Nav className="justify-content-end">
                <Nav.Item>
                    <Nav.Link href="/about">About</Nav.Link> 
                </Nav.Item>
                </Nav>
            </Navbar.Collapse>  
            </Container>  
        </Navbar>  
    </>
  );
};

