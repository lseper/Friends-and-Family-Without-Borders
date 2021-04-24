import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import DropDown from '../components/dropDown';
import Button from '../components/button';
import InputTextForm from '../components/inputTextForm'
import axios from 'axios';

export class CreateAccount extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      userName: '',
      password: '',
      email: '',
      publicInfo: true,
      errors: '',
    };
  }

  buildPost = (event) => {
    event.preventDefault();
    let accountInformation = {
      username: this.state.userName,
      password: this.state.password,
      name: "test",
      email: this.state.email,
      privacy: this.state.publicInfo
    }
    console.log(accountInformation);

    axios.post('/users', accountInformation)
      .then(res => {
        localStorage.setItem('SignupErrors', "None");
        const authorization = `Bearer ${res.data.auth_token}`;
        localStorage.setItem('authToken', authorization);
        const userId = res.data.user_id;
        localStorage.setItem('user_id', userId)
        axios.defaults.headers.common['Authorization'] = authorization;
        console.log("We have successfully signed up!");
        console.log("Authorization token is for the sign in page:", localStorage['authToken']);
        console.log("User id is for the sign in page:", localStorage['user_id']);
        this.props.history.push('/questionnaire');
      }).catch(err => {
        console.log("We ran into an issue with created an account");
        this.setState({
          errors: err.response.data.message
        })
        
        console.log(err.response.data.message);
      })
    localStorage.setItem('filledOutQuestionnaire', false);
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

  emailCallBack = (inputText) => {
    this.setState({ email: inputText })
  }

  render() {
    return (
      <div >
        <section className="App pt-8 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
          <div className="px-1">
            <label htmlFor="title" className="text-3xl text-left block font-bold text-coolGrey-dark"> Create Account</label>
            <label htmlFor="title" className="text-lg text-left block pb-2 text-coolGrey-dark"> Fill out the following information</label>
          </div>
        </section>
        <section className="flex flex-grow align-start items-start py-4 px-5 md:w-5/6 w-full">
          <form action="" className="flex grid grid-cols-1 flex-grow bg-white border-2 rounded px-8 py-8 pt-8">
            <InputTextForm focusRing = 'coolGreen' color = '#BDE4A7' handleCallBack={this.userNameCallBack} type="text" label="USERNAME" placeholder="exampleUsername" />
            &nbsp;&nbsp;&nbsp;
            <InputTextForm focusRing = 'coolGreen' color = '#BDE4A7' handleCallBack={this.passwordCallBack} type="password" label="PASSWORD" placeholder="examplePassword" />
            &nbsp;&nbsp;&nbsp;
            <InputTextForm focusRing = 'coolGreen' color = '#BDE4A7' handleCallBack={this.emailCallBack} type="email" label="EMAIL" placeholder="example@gmail.com" />
            &nbsp;&nbsp;&nbsp;
            <DropDown handleCallback={this.publicCallBack} 
              name="EVENT RESPONSES PRIVATE" 
              data = {[
                {
                  value: 1,
                  label: "Yes"
                },
                {
                  value: 2,
                  label: "No"
                }
              ]} 
              downlable={true}
              backgroundColor = "bg-coolGreen"
              primaryColor = '#BDE4A7'
              initalState = {true} />
            {this.state.errors !== '' && (
              <span className="flex justify-evenly align-center text-center items-center font-medium tracking-wide text-red-400 text-xs mt-1 ml-1">
                {this.state.errors}
              </span>
            )}
          </form>
        </section>
        <section className="w-full flex justify-start align-bottom items-left bg-grey-500 pb-4 px-5">
          <div className="flex">
            <div onClick={this.buildPost}>
              <Button name="CREATE ACCOUNT" bgColor="bg-coolGreen" hoverColor="bg-coolGreen-dark"/>
            </div>
            <NavLink to="/" className="ml-4 font-bold text-coolGrey-dark text-xl inline mt-2.5 flex">
              Cancel
            </NavLink>
          </div>
        </section>
      </div>

    )
  }
}

export default CreateAccount;