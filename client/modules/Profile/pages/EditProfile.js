import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile, getCurrentProfile } from '../ProfileActions';
import isEmpty from '../../../../server/validation/is-empty';

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.router.push('/dashboard');
    } else {
      this.props.getCurrentProfile();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    } else {
      this.refs.headline.value = this.refs.location.value = this.refs.bio.value = '';
    }

    if (newProps.profile.profile) {
      const profile = newProps.profile.profile;
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      this.refs.headline.value = profile.headline;
      this.refs.location.value = profile.location;
      this.refs.bio.value = profile.bio;
    }
  }

  handleCreateProfile = () => {
    const profileData = {
      headline: this.refs.headline.value,
      location: this.refs.location.value,
      bio: this.refs.bio.value,
    };

    this.props.createProfile(profileData, this.props.router);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h2 className="text-center">Edit Profile</h2>
              <form>
                <div className="form-group">
                  <label htmlFor="headline">* Headline</label>
                  <input type="text" className={`form-control ${errors.headline ? 'is-invalid' : ''}`} id="headline" placeholder="* Headline" ref="headline" />
                  {errors.headline && <div className="invalid-feedback">{errors.headline}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input type="text" className={`form-control ${errors.location ? 'is-invalid' : ''}`} id="location" placeholder="Location" ref="location" />
                  {errors.location && <div className="invalid-feedback">{errors.location}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="bio">Short Bio</label>
                  <textarea className={`form-control ${errors.bio ? 'is-invalid' : ''}`} id="bio" rows="3" placeholder="Short Bio" ref="bio" />
                  {errors.bio && <div className="invalid-feedback">{errors.bio}</div>}
                </div>
                <div className="form-group">
                  <a className="btn btn-primary" href="#" onClick={this.handleCreateProfile}>Submit</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object,
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.profile.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(EditProfile);
