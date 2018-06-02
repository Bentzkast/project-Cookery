import React from 'react';

export default () => {
  return (
    <footer className="page-footer white-text ">
      <div className="container">
        <div className="row">
          <div className="col s12 m6">
            <h5 className="white-text">Goal</h5>
            <p>Provide easy way to craft meals and make grandma proud</p>
          </div>
        </div>
      </div>
      <div className="footer-copyright white-text ">
        <div className="container">
          Copyright &copy; {new Date().getFullYear()} Cookery
          <a className="white-text right">Terms and Conditions</a>
        </div>
      </div>
    </footer>
  );
};
