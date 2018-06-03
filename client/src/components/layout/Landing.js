import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

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
Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
