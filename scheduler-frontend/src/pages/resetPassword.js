import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Button from '../components/button';
import InputTextForm from '../components/inputTextForm'
import axios from 'axios';

export class resetPassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      password: '',
      email: '',
      errors: '',
    };
  }

  buildPost = (event) => {
    event.preventDefault();
    let accountInformation = {
      password: this.state.password,
      email: this.state.email
    }

    console.log(accountInformation);

    // axios.post('/users', accountInformation)
    //   .then(res => {
    //   this.props.history.push('/login');
    //   }).catch(err => {
    //     console.log("We ran into an issue");
    //     this.setState({
    //       errors: err.response.data.message
    //     })
    //     console.log(err.response.data.message);
    //   })
  }

  passwordCallBack = (inputText) => {
    this.setState({ password: inputText })
  }

  emailCallBack = (inputText) => {
    this.setState({ email: inputText })
  }

  render() {
    return (
      <div >
        <section className="App pt-8 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
          <div className="px-1">
            <label htmlFor="title" className="text-3xl text-left block font-bold text-coolGrey-dark"> Reset Password</label>
            <label htmlFor="title" className="text-lg text-left block pb-2 text-coolGrey-dark"> Enter Email associated with account and the new password</label>
          </div>
        </section>
        <section className="flex flex-grow align-start items-start py-4 px-5 md:w-5/6 w-full">
          <form action="" className="flex grid grid-cols-1 flex-grow bg-white border-2 rounded px-8 py-8 pt-8">
            <InputTextForm focusRing = 'coolGreen' color = '#BDE4A7' handleCallBack={this.emailCallBack} type="email" label="EMAIL" placeholder="example@gmail.com" />
            &nbsp;&nbsp;&nbsp;
            <InputTextForm focusRing = 'coolGreen' color = '#BDE4A7' handleCallBack={this.passwordCallBack} type="password" label="NEW PASSWORD" placeholder="examplePassword" />
            &nbsp;&nbsp;&nbsp;
            {/* {this.state.errors !== '' && (
              <span className="flex justify-evenly align-center text-center items-center font-medium tracking-wide text-red-400 text-xs mt-1 ml-1">
                {this.state.errors}
              </span>
            )} */}
          </form>
        </section>
        <section className="w-full flex justify-start align-bottom items-left bg-grey-500 pb-4 px-5">
          <div className="flex">
            <div onClick={this.buildPost}>
              <Button name="UPDATE PASSWORD" bgColor="bg-coolGreen" hoverColor = "bg-coolGreen-dark"/>
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

export default resetPassword;