import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import store from './store';

import './components/layout/Navbar';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/user/Login';
import Register from './components/user/Register';

if (localStorage.jwtToken) {
  // set auth header
  setAuthToken(localStorage.jwtToken);
  // get info from token
  const decoded = jwt_decode(localStorage.jwtToken);
  // dispatch redux state
  store.dispatch(setCurrentUser(decoded));

  // check if token expire
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // TODO: clear current profile
    // redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <div className="app yellow lighten-4">
              <Route exact path="/" component={Landing} />
              <div className="container">
                <Route exact path="/login" component={Login} />
                <Route exact path="/register" component={Register} />
              </div>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
