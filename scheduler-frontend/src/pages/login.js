import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import InputText from '../components/inputText';
import Button from '../components/button';
import axios from 'axios';

export class login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: ''
    };
  }

  componentDidMount() {
    // if a user is already logged in then it brings them to the homepage
    if (localStorage['user_id'] && localStorage['authToken']) {
      this.props.history.push('/homePage');
    }
  }

  buildPost = (event) => {
    event.preventDefault();
    let loginInfo = {
      username: this.state.userName,
      password: this.state.password
    }

    axios.post('/login', loginInfo)
      .then(res => {
        localStorage.setItem('LoginErrors', "None");
        const authorization = `Bearer ${res.data.auth_token}`;
        localStorage.setItem('authToken', authorization);
        const userId = res.data.user_id;
        localStorage.setItem('user_id', userId)
        axios.defaults.headers.common['Authorization'] = authorization;
        console.log("We have successfully logged in!");
        console.log("Authorization token is:", localStorage['authToken']);
        console.log("User id is:", localStorage['user_id']);
        this.props.history.push('/homePage');
      }).catch(err => {
        console.log("We ran into an issue");
        window.location.reload();
        localStorage.setItem('LoginErrors', err.response.data.message);
      })
  }

  userNameCallBack = (inputText) => {
    this.setState({ userName: inputText })
  }

  passwordCallBack = (inputText) => {
    this.setState({ password: inputText })
  }

  render() {
    return (
      <div className="">
        <section className="App py-10 px-10 w-full flex justify-center items-coolGrey">
          <div className="px-1 pb-1">
            <label htmlFor="title" className="text-3xl block font-bold  pb-2 text-coolGrey-dark">WELCOME</label>
          </div>
        </section>
        <section className="App h-2/3 w-full flex justify-center items-start bg-white py-4 px-4">
          <form action="" className=" sm:w-3/4 md:w-1/3 shadow-lg rounded px-8 py-8 pt-8">
            <InputText login={true} handleCallback={this.userNameCallBack} type="text" border="coolGreen" placeholder="exampleUsername" label="USERNAME" />
            <InputText login={true} handleCallback={this.passwordCallBack} type="password" border="coolGreen" placeholder="examplePassword" label="PASSWORD" />

            {localStorage['LoginErrors'] !== 'None' && (
              <span className="flex justify-evenly align-center text-center items-center font-medium tracking-wide text-brightPink text-xs mt-1 ml-1">
                {localStorage['LoginErrors']}
              </span>
            )}

                  &nbsp;&nbsp;&nbsp;

                    <NavLink to="/homePage">
              <div className="" onClick={this.buildPost}>
                <Button name="Sign In" bgColor="bg-coolGreen" type="submit"/>
              </div>
            </NavLink>

                  &nbsp;&nbsp;&nbsp;
                  <div className="flex">
              {/* 
                    // not currently set up 
                    <p className="text-sm text-coolGrey-dark font-sans py-1 px-10 rounded focus:outline-none focus:shadow-outline" >
                      Forgot your password? 
                      <NavLink to = "/createAccount">
                          <button className="hover:text-coolBlue-dark text-coolBlue"> Click here</button>
                      </NavLink>
                    </p> */}
              <p className="flex text-sm text-left text-coolGrey-dark font-sans py-1 rounded focus:outline-none focus:shadow-outline" >
                <NavLink to="/createAccount">
                  <button className="text-left text-coolGreen underline"> SIGN UP HERE</button>
                </NavLink>
              </p>
            </div>
          </form>
        </section>
      </div>
    )
  }
}

export default login;