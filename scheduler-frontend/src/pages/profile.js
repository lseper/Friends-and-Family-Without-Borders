import React, { Component } from 'react'
import NavBar from '../components/navBar';
import DropDown from '../components/dropDown';
import InputText from '../components/inputText';
import { NavLink } from 'react-router-dom';
import GreenButton from '../components/greenButton';
import axios from 'axios';

export class profile extends Component {

  componentDidMount() {
    // if a user is not logged in, brings them to the login page
    if(!localStorage['user_id'] && !localStorage['authToken']) {
      this.props.history.push('/');
      localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
    }
  }
  
  logout = () => {
    console.log("Logging out")
    localStorage.setItem('authToken', '');
    localStorage.setItem('user_id', '');
    
    console.log("Authorization token after logging out: ", localStorage['authToken']);
    console.log("User id after loggin out: ", localStorage['user_id']);

    if (localStorage['authToken'] === '' && localStorage['user_id'] === '') {
      alert("Logging out!");
    }
  }

  constructor(props){
    super(props);
    this.state = { 
      preferredName: '',
      userName: '',
      password: '',
      phoneNumber: '',
      publicInfo: ''
    };
  }

  preferredCallBack = (inputText) => {
    this.setState({preferredName: inputText})
  }

  userNameCallBack = (inputText) => {
    this.setState({userName: inputText})
  }

  phoneNumberCallBack = (inputText) => {
    this.setState({phoneNumber: inputText})
  }

  publicCallBack = (option) => {
    if (option === 1) {
      this.setState({publicInfo: true});
    } else {
      this.setState({publicInfo: false});
    }
    
  }

  buildPost = () => {
    const newaccountinfo = [this.state.userName, this.state.preferredName, this.state.phoneNumber, this.state.publicInfo]
    console.log(newaccountinfo);
  }

  componentDidMount() {

    const authorization = localStorage.getItem('authToken');
    //console.log(authorization);
    //console.log("User id on profile page: ", localStorage['user_id']);
        axios.get(`/users/${localStorage['user_id']}`,{
          headers: {
            'Authorization': authorization
          }
        })
        .then(res => {
            this.setState({
                preferredName: res.data.name,
                userName: res.data.username,
                phoneNumber: res.data.phone,
                publicInfo: res.data.privacy,
            })
        }).then(() => {
            console.log(this.state);
        }).catch(err => {
            console.log(err);
        })

  }

    render() {
        return (
            <div>
                <NavBar />
                <section className="App py-10 w-full flex justify-center items-coolGrey">
                <div className="px-2 align-center text-center">
                    <label htmlFor="title" className="text-4xl text-center block font-bold text-coolGrey-dark">{this.state.preferredName}</label>
                    <div className = 'px-5 py-4 flex justify-center text-center align-center'>
                      <label htmlFor="title" className="text-2xl text-center block font-bold text-coolGrey-dark py-2 px-3">COMFORT </label>
                      <div class="rounded-full h-12 w-12 flex items-center justify-center text-center bg-coolGreen py-2 px-3"></div>
                    </div>
                    <div className="mt-4">
                      <NavLink to = "/">
                        <button className="bg-coolGreen hover:bg-coolGrey hover:shadow-md text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline shadow-xl" type="button" onClick={this.logout}>Logout</button>
                      </NavLink>
                    </div>
                </div>
              </section>
              <div className = "flex px-4 py-10 w-full justify-center items-start bg-coolGrey ">
                <section className="w-full flex align-top justify-evenly items-start bg-grey-500 py-4 px-4">
                <div className="w-full max-w-md bg-gray-800" >
                  <form action="" className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                    <InputText type = "text" border = "coolGreen" placeholder = {this.state.preferredName} handleCallback = {this.preferredCallBack} label = "PREFERRED NAME"/>
                    <InputText type = "text" border = "coolGreen" placeholder = {this.state.userName} handleCallback = {this.userNameCallBack} label = "USERNAME"/>
                    <InputText type = "text" border = "coolGreen" placeholder = {this.state.phoneNumber} handleCallback = {this.phoneNumberCallBack} label = "PHONE NUMBER"/>
                    <DropDown name = "INFORMATION PUBLIC TO USERS" handleCallback = {this.publicCallBack}  option1 = "Yes" option2 = "No"/>
                    &nbsp;&nbsp;&nbsp;
                    <div className = "flex justify-evenly align-center items-center">
                      <NavLink to = "/homePage">
                        <GreenButton name = "Update Profile Information" />
                      </NavLink>
                  </div>
                    &nbsp;&nbsp;&nbsp;
                  </form>
                </div>
              </section>
              </div>
              <section className="App min-h-0 w-full flex justify-evenly align-bottom items-center bg-grey-500 py-8 px-4">
              </section>
            </div>
        )
    } 
}

export default profile;