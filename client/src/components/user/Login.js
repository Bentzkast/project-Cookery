import React, { Component } from 'react';

export default class componentName extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: ''
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault(e);
    const logUser = {
      username: this.state.username,
      password: this.state.password
    };

    console.log(logUser);
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col s12">
            <h2 className="center">Log in</h2>
            <form onSubmit={this.onSubmit}>
              <div className="row ">
                <div className="col offset-s3 s6 input-field">
                  <input
                    value={this.state.username}
                    type="text"
                    id="username"
                    className="validate"
                    onChange={this.onChange}
                  />
                  <label htmlFor="username" className="">
                    Username
                  </label>
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
