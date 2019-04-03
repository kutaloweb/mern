import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile } from '../ProfileActions';
import isEmpty from '../../../../server/validation/is-empty';

class Profile extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.router.push('/dashboard');
    } else {
      this.props.getCurrentProfile();
    }
  }

  render() {
    const { user } = this.props.auth;
    const { profile } = this.props.profile;
    let profileContent;
    if (profile !== null && Object.keys(profile).length > 0) {
      profileContent = (
        <div className="card card-body bg-light mb-3">
          <p className="lead">
            <span>{user.name}</span>
          </p>
          <p className="lead">
            <span>{profile.headline}</span>
          </p>
            {isEmpty(profile.location) ? (
              null
            ) : (
              <p className="lead">
                <span>{profile.location}</span>
              </p>
            )}
            {isEmpty(profile.bio) ? (
              null
            ) : (
              <p className="lead">
                <span>{profile.bio}</span>
              </p>
            )}
        </div>
      );
    }
    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {profileContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  router: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    profile: state.profile,
    auth: state.auth,
  };
}

export default connect(mapStateToProps, { getCurrentProfile })(Profile);
