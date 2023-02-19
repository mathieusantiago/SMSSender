import {Nav,Navbar} from 'react-bootstrap';

const NavBar = () => {
  return (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">App SSR next</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/dog">Dog</Nav.Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;