import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

// Import Style
import styles from './Header.css';

// Import Components
import { Navbar, Nav, NavItem } from 'react-bootstrap';

export function Header(props, context) {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" className={styles.header}>
        <Link className="navbar-brand" to="/">MERN Starter</Link>
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
              ? <Nav>
                {
                  <NavItem>
                    <Nav.Link onClick={props.logout}>Logout</Nav.Link>
                  </NavItem>
                }
              </Nav>
              : <Nav>
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
  toggleAddPost: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

export default Header;
