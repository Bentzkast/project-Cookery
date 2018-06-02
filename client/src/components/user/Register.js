import React, { Component } from 'react';
import './User.css';

export default class componentName extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      email: '',
      password: '',
      password2: ''
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

    console.log(newUser);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
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
                  className="validate"
                  onChange={this.onChange}
                />
                <label htmlFor="username">Username</label>
              </div>
            </div>
            <div className="row ">
              <div className="col offset-s3 s6 input-field">
                <input
                  value={this.state.email}
                  type="email"
                  id="email"
                  className="validate"
                  onChange={this.onChange}
                />
                <label htmlFor="email" className="">
                  Email
                </label>
                <span
                  className="helper-text"
                  data-error="invalid"
                  data-success="valid"
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
                  className="validate"
                  onChange={this.onChange}
                />
                <label htmlFor="password" className="">
                  Password
                </label>
              </div>
            </div>
            <div className="row ">
              <div className="col offset-s3 s6 input-field">
                <input
                  value={this.state.password2}
                  type="password"
                  id="password2"
                  className="validate"
                  onChange={this.onChange}
                />
                <label htmlFor="password2" className="">
                  Confirm&nbsp;Password
                </label>
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
