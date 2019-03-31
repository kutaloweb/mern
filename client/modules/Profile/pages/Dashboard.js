import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../ProfileActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user, isAuthenticated } = this.props.auth;
    const { profile } = this.props.profile;
    let dashboardContent;
    if (!isAuthenticated) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">You are not logged in</p>
        </div>
      );
    } else if (profile !== null && Object.keys(profile).length > 0) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome, {user.name}</p>
        </div>
      );
    } else if (profile !== null) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome, {user.name}</p>
          <p className="lead text-muted">You have not yet setup a profile, please add some info</p>
        </div>
      );
    }
    return (
      <div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="display-4 text-center">
                {dashboardContent}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
    auth: state.auth,
  };
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
