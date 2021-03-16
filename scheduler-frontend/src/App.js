import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import CreateAccount from './pages/createAccount';
import Login from './pages/login';
import CreateEvent from './pages/createEvent';
import HomePage from './pages/homePage';
import Navigation from './components/navigation';
import Questionnaire from './pages/questionnaire';
import Profile from './pages/profile';
import CreatedEvents from './pages/createdEvents';

import './App.css';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';

export class App extends Component {
  //adding a function to set a user id 
  //call function if authorized 
  //pass this function to login render instead of pageProps it would be the name of your function 
  //in login, call that function, set the id 
  //set pageProps.match.params.id

  componentDidMount() {
    localStorage.setItem("user_id", 100)
    //name?
    localStorage.setItem("firstTimeUser", false)
  }

  render() {
    return (
      <BrowserRouter >
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Login} exact/>
             <Route path="/createAccount" component={CreateAccount}/>
             <Route path="/homePage" component={HomePage}/>
             <Route path="/createEvent" component={CreateEvent}/>
             <Route path="/questionnaire" component={Questionnaire} />
             <Route path="/questionnaire/:id" render = {(pageProps) => (<Questionnaire userId={pageProps.match.params.id} />) }/>
             <Route path="/profile" component={Profile}/>
             <Route path="/createdEvents" component={CreatedEvents}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
