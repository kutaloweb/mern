import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getCurrentProfile, deleteAccount } from '../ProfileActions';
import { Link } from 'react-router';
import { Button, Modal } from 'react-bootstrap';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDeleteModal: false,
    };
  }

  componentDidMount() {
    this.props.getCurrentProfile();
  }

  handleCloseDeleteModal = () => {
    this.setState({ showDeleteModal: false });
  };

  handleShowDeleteModal = () => {
    this.setState({ showDeleteModal: true });
  };

  handleDeleteAccount = () => {
    this.props.deleteAccount();
    this.handleCloseDeleteModal();
  };

  render() {
    const { showDeleteModal } = this.state;
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
          <p className="lead text-muted">Welcome, <Link to="/profile">{user.name}</Link></p>
          <button onClick={this.handleShowDeleteModal} className="btn btn-sm btn-danger">
            Delete My Account
          </button>
        </div>
      );
    } else if (profile !== null) {
      dashboardContent = (
        <div>
          <p className="lead text-muted">Welcome, {user.name}</p>
          <p className="lead text-muted">You have not yet setup a profile, please add some info</p>
          <Link to="/dashboard/profile/create" className="btn btn-sm btn-success">
            Create Profile
          </Link>
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

        <Modal show={showDeleteModal} onHide={this.handleCloseDeleteModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to delete your account?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseDeleteModal}>
              Close
            </Button>
            <Button variant="danger" onClick={this.handleDeleteAccount}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
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
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
