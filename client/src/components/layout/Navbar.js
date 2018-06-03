import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import './layout.css';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const guestLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
      </ul>
    );
    const authLinks = (
      <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Log out</a>
        </li>
      </ul>
    );

    const guestLinksMobile = (
      <ul id="mobile-tab" className="sidenav">
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <Link to="/login">Log in</Link>
        </li>
        <li>
          <Link to="/register">Sign Up</Link>
        </li>
      </ul>
    );

    const authLinksMobile = (
      <ul id="mobile-tab" className="sidenav">
        <li>
          <Link to="/recipes">Recipes</Link>
        </li>
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Log out</a>
        </li>
      </ul>
    );

    return (
      <div>
        <nav className="navbar-fixed">
          <div className="container">
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo">
                Cookery
              </Link>
              <a data-target="mobile-tab" className="sidenav-trigger">
                <i className="material-icons">menu</i>
              </a>
              {isAuthenticated ? authLinks : guestLinks}
            </div>
          </div>
        </nav>
        {isAuthenticated ? authLinksMobile : guestLinksMobile}
      </div>
    );
  }
}
Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(Navbar);
