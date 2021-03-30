import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import DropDown from '../components/dropDown';
import InputText from '../components/inputText';
import Button from '../components/button';
import axios from 'axios';

export class createAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userName: '',
      password: '',
      phoneNumber: '',
      publicInfo: false
    };
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
        //console.log(res.data.user_id);
        const userId = res.data.user_id;
        localStorage.setItem('user_id', userId)
        axios.defaults.headers.common['Authorization'] = authorization;
        console.log("We have successfully signed up!");
        console.log("Authorization token is for the sign in page:", localStorage['authToken']);
        console.log("User id is for the sign in page:", localStorage['user_id']);
        this.props.history.push('/');
      }).catch(err => {
        console.log("We ran into an issue");
        window.location.reload();
        localStorage.setItem('SignupErrors', err.response.data.message);
        console.log(err.response.data.message);
      })
    localStorage.setItem('filledOutQuestionnaire', false);
  }

  nameCallBack = (inputText) => {
    this.setState({ name: inputText })
  }

  userNameCallBack = (inputText) => {
    this.setState({ userName: inputText })
  }

  passwordCallBack = (inputText) => {
    this.setState({ password: inputText })
  }

  publicCallBack = (option) => {
    if (option === 1) {
      this.setState({ publicInfo: true });
    } else {
      this.setState({ publicInfo: false });
    }

  }

  numberCallBack = (inputText) => {
    this.setState({ phoneNumber: inputText })
  }

  render() {
    return (
      <div >
        <section className="App py-10 w-full flex justify-center items-coolGrey">
          <div className="px-1 pb-1 align-middle">
            <label htmlFor="title" className="text-3xl block font-bold  pb-2 text-coolGrey-dark">ENTER PROFILE INFORMATION</label>
            <NavLink to="/">
                    <button className="ml-5 hover:text-gray-300">Go Back to Login</button>
          </NavLink>
          </div>
        </section>
        <section className="App h-2/3 w-full flex justify-center bg-white py-4 px-4">
          <form action="" className=" sm:w-3/4 md:w-1/3 shadow-lg rounded px-8 py-8 pt-8">
            <InputText login={true} handleCallback={this.userNameCallBack} type="text" border="coolGreen" borderColor="border border-coolGreen" placeholder="exampleUsername" label="USERNAME" />
            <InputText login={true} handleCallback={this.passwordCallBack} type="password" border="coolGreen" borderColor="border border-coolGreen" placeholder="examplePassword" label="PASSWORD" />
            <InputText login={true} handleCallback={this.numberCallBack} type="phoneNumber" border="coolGreen" borderColor="border border-coolGreen" placeholder="123456789" label="PHONE NUMBER" />
            <InputText login={true} handleCallback={this.nameCallBack} type="text" border="coolGreen" borderColor="border border-#E8E8E8" placeholder="Name" label="PREFERRED NAME" />
            <DropDown handleCallback={this.publicCallBack} name="INFORMATION PUBLIC TO USERS" option1="Yes" option2="No" />
            {localStorage['SignupErrors'] !== 'None' && (
              <span className="flex justify-evenly align-center text-center items-center font-medium tracking-wide text-red-400 text-xs mt-1 ml-1">
                {localStorage['SignupErrors']}
              </span>
            )}
                    &nbsp;&nbsp;&nbsp;

                    <NavLink to="/">
              <div onClick={this.buildPost} className="flex w-full">
                <Button name="Create Account" bgColor="bg-coolGreen" />
              </div>
            </NavLink>

                    &nbsp;&nbsp;&nbsp;
                  </form>
        </section>
      </div>

    )
  }
}

export default createAccount;