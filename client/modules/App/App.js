import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import Helmet from 'react-helmet';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

// Import Actions
import { toggleAddPost } from './AppActions';
import { logout } from '../Auth/AuthActions';
import { clearCurrentProfile } from '../Profile/ProfileActions';

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({isMounted: true}); // eslint-disable-line
  }

  handleLogout = () => {
    this.props.dispatch(clearCurrentProfile());
    this.props.dispatch(logout(this.props.router));
  };

  toggleAddPostSection = () => {
    this.props.dispatch(toggleAddPost());
  };

  render() {
    return (
      <div>
        <Helmet
          title="MERN Starter - Blog App"
          titleTemplate="%s - Blog App"
          meta={[
            { charset: 'utf-8' },
            {
              'http-equiv': 'X-UA-Compatible',
              content: 'IE=edge',
            },
            {
              name: 'viewport',
              content: 'width=device-width, initial-scale=1',
            },
          ]}
        />
        <Header
          toggleAddPost={this.toggleAddPostSection}
          logout={this.handleLogout}
          isAuthenticated={this.props.isAuthenticated}
          userName={this.props.userName}
          showEditProfile={this.props.showEditProfile}
        />
        <br />
        <div className="container">
          {this.props.children}
        </div>
        <br />
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  showEditProfile: PropTypes.bool,
  userName: PropTypes.string,
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  userName: state.auth.user.name,
  showEditProfile: state.profile.profile !== null && Object.keys(state.profile.profile).length > 0,
});

export default connect(mapStateToProps)(App);
