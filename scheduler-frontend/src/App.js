import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateAccount from './pages/createAccount';
import Login from './pages/login';
import CreateEvent from './pages/createEvent';
import HomePage from './pages/homePage';
import Questionnaire from './pages/questionnaire';
import Profile from './pages/profile';
import CreatedEvents from './pages/createdEvents';

import './App.css';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export class App extends Component {
  
  render() {
    return (

      <BrowserRouter >
        <div>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/createAccount" component={CreateAccount} />
            <Route path="/homePage" component={HomePage} />
            <Route path="/createEvent" component={CreateEvent} />
            <Route path="/questionnaire" component={Questionnaire} />
            <Route path="/profile" component={Profile} />
            <Route path="/createdEvents" component={CreatedEvents} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
