import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from './AuthActions';

class LoginForm extends Component {
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
    if (newProps.auth.isAuthenticated) {
      this.props.router.push('/');
    }
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  handleLoginUser = () => {
    const userData = {
      email: this.refs.email.value,
      password: this.refs.password.value,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="container my-4">
        <div className="row">
          <div className="col-md-6 m-auto">
            <h2 className="text-center">Log In</h2>
            <form>
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
                <a className="btn btn-primary" href="#" onClick={this.handleLoginUser}>Login</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object,
  router: PropTypes.object,
};

const mapStateToProps = state => ({
  errors: state.auth.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(LoginForm);
