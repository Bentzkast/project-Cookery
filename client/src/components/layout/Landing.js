import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class componentName extends Component {
  render() {
    return (
      <div className="showcase">
        <h1>Share recipes and experiment!</h1>
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="col s6 ">
                <div>
                  <Link
                    to="/register"
                    className="btn btn-wide waves-effect waves light"
                  >
                    Sign&nbsp;Up
                  </Link>
                </div>
              </div>
              <div className="col s6 ">
                <div>
                  <Link
                    to="/login"
                    className="btn btn-wide waves-effect waves light"
                  >
                    Log&nbsp;in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
