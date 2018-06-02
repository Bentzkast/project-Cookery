import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import './components/layout/Navbar';
import './App.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/user/Login';
import Register from './components/user/Register';

class App extends Component {
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
