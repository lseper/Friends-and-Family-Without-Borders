import React, { Component } from 'react'
import EmsFirst from './components/firstComponent';
import './App.css';

export class App extends Component {
  render(){
    return (
      <div className="App">
        <EmsFirst name="Login "/>
      </div>
    );
  }
}

export default App;
