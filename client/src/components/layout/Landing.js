import React, { Component } from 'react';

export default class componentName extends Component {
  render() {
    return (
      <div className="showcase">
        <h1>Share recipes and experiment!</h1>
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="col s6 ">
                <a
                  href="register.html"
                  className="btn waves-effect waves light"
                >
                  Register
                </a>
              </div>
              <div className="col s6 ">
                <a href="login.html" className="btn waves-effect waves light">
                  Login
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
