import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

// Import Components
import { Navbar, Nav, NavItem, NavDropdown } from 'react-bootstrap';

// Import Images
import logo from '../../../../assets/images/react-logo.png';

export function Header(props, context) {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className={styles.header}>
        <Link className="navbar-brand" to="/"><img src={logo} alt="Logo" height="35px" /> MERN Starter</Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" />
          {
            context.router.isActive('/', true) && props.isAuthenticated
              ? <a className="btn btn-success" href="#" role="button" onClick={props.toggleAddPost}>Add Post</a>
              : null
          }
          {
            props.isAuthenticated
              ?
              <Nav>
                <NavDropdown alignRight title={props.userName} id="basic-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/dashboard">
                    Dashboard
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/dashboard/profile/edit">
                    Edit Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={props.logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              :
              <Nav>
                <NavItem>
                  <Link className="nav-link" to="/register" >
                    Register
                  </Link>
                </NavItem>
                <NavItem>
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </NavItem>
              </Nav>
          }
        </Navbar.Collapse>
      </Navbar>
    </header>
  );
}

Header.contextTypes = {
  router: PropTypes.object,
};

Header.propTypes = {
  toggleAddPost: PropTypes.func,
  logout: PropTypes.func,
  isAuthenticated: PropTypes.bool,
  userName: PropTypes.string,
};

export default Header;
