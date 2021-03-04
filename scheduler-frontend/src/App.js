import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

//import FirstComponent from './components/firstComponent';
import CreateAccount from './pages/createAccount';
import Login from './pages/login';
import CreateEvent from './pages/createEvent';
import HomePage from './pages/homePage';
import Navigation from './components/navigation';
import './App.css';



export class App extends Component {

  render() {
    return (
      // <div className="Login">
      //   <Login/>
      // </div>
      <BrowserRouter>
        <div>
          <Navigation />
            <Switch>
             <Route path="/" component={Login} exact/>
             <Route path="/createAccount" component={CreateAccount}/>
             <Route path="/homePage" component={HomePage}/>
             <Route path="/createEvent" component={CreateEvent}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}

export default App;
