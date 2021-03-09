import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateAccount from './pages/createAccount';
import Login from './pages/login';
import CreateEvent from './pages/createEvent';
import HomePage from './pages/homePage';
import Navigation from './components/navigation';
import Questionnaire from './pages/questionnaire';
import Profile from './pages/profile';

import './App.css';



export class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Login} exact/>
             <Route path="/createAccount" component={CreateAccount}/>
             <Route path="/homePage" component={HomePage}/>
             <Route path="/createEvent" component={CreateEvent}/>
             <Route path="/questionnaire" component={Questionnaire}/>
             <Route path="/profile" component={Profile}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
