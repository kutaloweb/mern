import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { registerUser } from '../AuthActions';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.router.push('/');
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleRegisterUser = () => {
    const newUser = {
      name: this.refs.name.value,
      email: this.refs.email.value,
      password: this.refs.password.value,
      password_confirm: this.refs.password_confirm.value,
    };

    this.props.registerUser(newUser, this.props.router);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6 m-auto">
            <h2 className="text-center">Sign Up</h2>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" className={`form-control ${errors.name ? 'is-invalid' : ''}`} id="name" placeholder="Name" ref="name" />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input type="text" className={`form-control ${errors.email ? 'is-invalid' : ''}`} id="email" placeholder="Email Address" ref="email" />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className={`form-control ${errors.password ? 'is-invalid' : ''}`} id="password" placeholder="Password" ref="password" />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>
              <div className="form-group">
                <label htmlFor="password_confirm">Confirm Password</label>
                <input type="password" className={`form-control ${errors.password_confirm ? 'is-invalid' : ''}`} id="password_confirm" placeholder="Confirm Password" ref="password_confirm" />
                {errors.password_confirm && <div className="invalid-feedback">{errors.password_confirm}</div>}
              </div>
              <div className="form-group">
                <a className="btn btn-primary" href="#" onClick={this.handleRegisterUser}>Register</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
  router: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    errors: state.auth.errors,
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { registerUser })(Register);
