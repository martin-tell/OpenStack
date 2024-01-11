import { Link } from 'react-router-dom'
import { Navbar, Nav, Button, Container } from 'react-bootstrap'

const MenuBar = ({ options, user }) => {
  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    location.reload()
  }

  return(
    <div className="container">
      <Navbar bg="light" expand="lg" className="mb-3">
        <Container>
          <Navbar.Brand as={Link} to="/">Blog App</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {options.map(o => (
                <Nav.Link as={Link} key={o} to={o === 'home' ? '/' : `/${o}`}>{o}</Nav.Link>
              ))}
            </Nav>
            <Nav className="ms-auto">
              <p className="me-3">{user.name} logged in</p>
              <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  )
}

export default MenuBar