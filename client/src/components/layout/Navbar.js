import React, { Component } from 'react';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav>
          <div className="container">
            <div className="nav-wrapper">
              <a href="/" className="brand-logo">
                Cookery
              </a>
              <ul id="nav-mobile" className="right hide-on-med-and-down">
                <li>
                  <a href="sass.html">Recipes</a>
                </li>
                <li>
                  <a href="badges.html">Login</a>
                </li>
                <li>
                  <a href="collapsible.html">Register</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
