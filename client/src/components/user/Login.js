import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/authActions';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      password: '',
      state: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault(e);
    const userData = {
      user: this.state.user,
      password: this.state.password
    };

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { errors } = this.props;

    return (
      <div>
        <div className="row">
          <div className="col s12">
            <h2 className="center">Log in</h2>
            <form onSubmit={this.onSubmit}>
              <div className="row ">
                <div className="col offset-m3 m6 offset-s1 s10 input-field">
                  <input
                    value={this.state.user}
                    type="text"
                    id="user"
                    className={` ${
                      errors.user
                        ? 'invalid'
                        : Object.values(errors).length > 0
                          ? 'valid'
                          : ''
                    }`}
                    onChange={this.onChange}
                  />
                  <label htmlFor="user" className="">
                    Email or Username
                  </label>
                  <span
                    className="helper-text"
                    data-error={errors.user ? errors.user : ''}
                  >
                    This site use Gravatar for profile picture
                  </span>
                </div>
              </div>
              <div className="row ">
                <div className="col offset-m3 m6 offset-s1 s10 input-field">
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
                  <button className="btn">Log In</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);
