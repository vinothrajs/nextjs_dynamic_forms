// components/Layout.js
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css';  
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';   
import NavBar from './NavBar'

const Layout = ({ children }) => {
  return (
    <>
      <NavBar/>
      <div className="container mt-4">{children}</div>
    </>
  );
};

export default Layout;
