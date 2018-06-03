import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../../actions/authActions';

import './User.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault(e);
    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    // pass in history to call
    this.props.registerUser(newUser, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.errors) {
  //     this.setState({ errors: nextProps.errors, password: '', password2: '' });
  //   } else {
  //     this.setState({ errors: {} });
  //   }
  // }

  render() {
    const { errors } = this.props;
    return (
      <div>
        <div className="row">
          <form onSubmit={this.onSubmit} className="col s12">
            <h2 className="center">Sign Up</h2>
            <h5 className="center">create your cookery account</h5>
            <div className="row ">
              <div className="col offset-s3 s6 input-field">
                <input
                  value={this.state.username}
                  type="text"
                  id="username"
                  className={`${
                    errors.username
                      ? 'invalid'
                      : Object.values(errors).length > 0
                        ? 'valid'
                        : ''
                  }`}
                  onChange={this.onChange}
                />
                <label htmlFor="username">Username</label>
                <span
                  className="helper-text"
                  data-error={errors.username ? errors.username : ''}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col offset-s3 s6 input-field">
                <input
                  value={this.state.email}
                  type="email"
                  id="email"
                  className={` ${
                    errors.email
                      ? 'invalid'
                      : Object.values(errors).length > 0
                        ? 'valid'
                        : ''
                  }`}
                  onChange={this.onChange}
                />
                <label htmlFor="email" className="">
                  Email
                </label>
                <span
                  className="helper-text"
                  data-error={errors.email ? errors.email : ''}
                >
                  This site use Gravatar for profile picture
                </span>
              </div>
            </div>
            <div className="row ">
              <div className="col offset-s3 s6 input-field">
                <input
                  value={this.state.password}
                  type="password"
                  id="password"
                  className={` ${
                    errors.password
                      ? 'invalid'
                      : Object.values(errors).length > 0
                        ? 'valid'
                        : ''
                  }`}
                  onChange={this.onChange}
                />
                <label htmlFor="password" className="">
                  Password
                </label>
                <span
                  className="helper-text"
                  data-error={errors.password ? errors.password : ''}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col offset-s3 s6 input-field">
                <input
                  value={this.state.password2}
                  type="password"
                  id="password2"
                  className={` ${
                    errors.password2
                      ? 'invalid'
                      : Object.values(errors).length > 0
                        ? 'valid'
                        : ''
                  }`}
                  onChange={this.onChange}
                />
                <label htmlFor="password2" className="">
                  Confirm&nbsp;Password
                </label>
                <span
                  className="helper-text"
                  data-error={errors.password2 ? errors.password2 : ''}
                />
              </div>
            </div>
            <div className="row ">
              <div className="col offset-s3 s6 input-field">
                <button className="btn">Join</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

// react component types definition
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

// with router so we can redirect in action

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
