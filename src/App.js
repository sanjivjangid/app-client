import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { Provider } from "react-redux";

// store config
import store from "./store";

import './App.css';

import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from './actions/authActions';

import Register from './components/Register';
import Login from './components/Login';
import AuthRouter from './components/AuthRouter';
import Dashboard from './components/Dashboard';

// auth check
if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "./login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Login} />
            <Switch>
              <AuthRouter exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

