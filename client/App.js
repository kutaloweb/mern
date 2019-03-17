/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import jwtDecode from 'jwt-decode';
import { setCurrentUser, logout } from './modules/Auth/AuthActions';

// Import Routes
import routes from './routes';

// Bootstrap stylesheet
require('../node_modules/bootstrap/dist/css/bootstrap.min.css');

// Base stylesheet
require('./main.css');

export default function App(props) {
  // Check for token
  if (localStorage.jwtToken) {
    const decoded = jwtDecode(localStorage.jwtToken);
    props.store.dispatch(setCurrentUser(decoded));
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      props.store.dispatch(logout());
      window.location.href = '/login';
    }
  }

  return (
    <Provider store={props.store}>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
