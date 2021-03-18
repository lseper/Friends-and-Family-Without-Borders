import React, { Component } from 'react'
import NavBar from '../components/navBar';
import DropDown from '../components/dropDown';
import InputText from '../components/inputText';
import { NavLink } from 'react-router-dom';
import GreenButton from '../components/greenButton'

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
    render() {
        return (
            <div>
                <NavBar />
                {/* <Banner username = " Emily"/> */}
                <section className="App py-10 w-full flex justify-start items-coolGrey">
                <div className="px-2 pb-1 align-left text-left">
                    <label htmlFor="title" className="text-3xl block font-bold text-coolGrey-dark">USERS PROFILE INFORMATION</label>
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
                    <InputText type = "text" border = "coolGreen" placeholder = "Emily" label = "PREFERRED NAME"/>
                    <InputText type = "email" border = "coolGreen" placeholder = "emilyrosekraai@gmail.com" label = "EMAIL ADDRESS"/>
                    <InputText type = "text" border = "coolGreen" placeholder = "4024194873" label = "PHONE NUMBER"/>
                    <DropDown name = "NOTIFICATION METHOD" option1 = "Text Message" option2 = "Email"/>
                    <DropDown name = "INFORMATION PUBLIC TO USERS" option1 = "Yes" option2 = "No"/>
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