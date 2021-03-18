import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import DropDown from '../components/dropDown';
import InputText from '../components/inputText';
import GreenButton from '../components/greenButton'
import axios from 'axios';

export class createAccount extends Component {

  constructor(props){
    super(props);
    this.state = { 
      name: '',
      userName: '',
      password: '',
      phoneNumber: '',
      publicInfo: false
    };
  }

  componentDidMount() {
    // if a user is not logged in, brings them to the login page
    if(!localStorage['user_id'] && !localStorage['authToken']) {
      this.props.history.push('/');
      localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
    }
  }

  buildPost = (event) => {
    event.preventDefault();
    let accountInformation = {
      username: this.state.userName, 
      password: this.state.password,  
      name: this.state.name, 
      phone: this.state.phoneNumber,
      privacy: this.state.publicInfo
    }
    console.log(accountInformation);

    axios.post('/users', accountInformation)
    .then(res => {
      localStorage.setItem('SignupErrors', "None");
      const authorization = `Bearer ${res.data.auth_token}`;
      localStorage.setItem('authToken', authorization);
      //user_id is sometimes undefined after creating one user 
      console.log(res.data.user_id);
      const userId = res.data.user_id;
      localStorage.setItem('user_id', userId)
      axios.defaults.headers.common['Authorization'] = authorization;
      console.log("We have successfully signed up!");
      console.log("Authorization token is for the sign in page:", localStorage['authToken']);
      console.log("User id is for the sign in page:", localStorage['user_id']);
      this.props.history.push('/');
    }).catch(() => {
      console.log("We ran into an issue");
      window.location.reload();
      localStorage.setItem('SignupErrors', "User already registered with this phone number");
    })
    //will send in post request
    localStorage.setItem('filledOutQuestionnaire', false);
  } 

  nameCallBack = (inputText) => {
    this.setState({name: inputText})
  }
  
  userNameCallBack = (inputText) => {
    this.setState({userName: inputText})
  }

  passwordCallBack = (inputText) => {
    this.setState({password: inputText})
  }

  // notificationCallBack = (option) => {
  //   this.setState({notification: option})
  // }

  publicCallBack = (option) => {
    if (option === 1) {
      this.setState({publicInfo: true});
    } else {
      this.setState({publicInfo: false});
    }
    
  }

  numberCallBack = (inputText) => {
    this.setState({phoneNumber: inputText})
  }

    render() {
        return (
          <div >
              <section className="App py-10 w-full flex justify-center items-coolGrey">
                <div className="px-1 pb-1 align-middle">
                    <label htmlFor="title" className="text-3xl block font-bold  pb-2 text-coolGrey-dark">ENTER PROFILE INFORMATION</label>
                </div>
              </section>
              <div className = "flex px-4 py-10 w-full justify-center items-start bg-coolGrey ">
              <section className="w-full flex align-top justify-evenly items-start bg-grey-500 py-4 px-4">
                <div className="w-full max-w-md bg-gray-800" >
                  <form action="" className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                    <InputText handleCallback = {this.nameCallBack} type = "text" border = "coolGreen" placeholder = "Name" label = "PREFERRED NAME"/>
                    <InputText handleCallback = {this.userNameCallBack} type = "text" border = "coolGreen" placeholder = "exampleUsername" label = "USERNAME"/>
                    <InputText handleCallback = {this.passwordCallBack} type = "password" border = "coolGreen" placeholder = "examplePassword" label = "PASSWORD"/>
                    <InputText handleCallback = {this.numberCallBack} type = "phoneNumber" border = "coolGreen" placeholder = "123456789" label = "PHONE NUMBER"/>
                    {/* <DropDown handleCallback = {this.notificationCallBack} name = "NOTIFICATION METHOD" option1 = "Text Message" option2 = "Email"/> */}
                    <DropDown handleCallback = {this.publicCallBack} name = "INFORMATION PUBLIC TO USERS" option1 = "Yes" option2 = "No"/>
                    {localStorage['SignupErrors'] !== 'None' && (
                      <span className="flex justify-evenly align-center text-center items-center font-medium tracking-wide text-red-400 text-xs mt-1 ml-1">
                        {localStorage['SignupErrors']}
                      </span>
                    )}
                    &nbsp;&nbsp;&nbsp;
                    
                    <NavLink to = "/">
                      <div onClick = {this.buildPost} className = "flex justify-evenly align-center items-center">
                        <GreenButton name = "Create Account" />     
                      </div>                   
                    </NavLink>

                    &nbsp;&nbsp;&nbsp;
                  </form>
                  
                </div>
              </section>
              </div>

              <section className="App pb-10 px-10 w-full flex justify-center items-coolGrey">
              <div className="px-1 pb-1">
              </div>
            </section>
          </div>

        )
    } 
}

export default createAccount;