import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import DropDown from '../components/dropDown';
import InputText from '../components/inputText';

export class createAccount extends Component {
    render() {
        return (
          <div>
              <section className="h-20 w-full flex justify-center items-center bg-grey-500">
                <div className="px-1 pb-1 py-36">
                    <label htmlFor="title" className="text-3xl block font-bold  pb-2 text-coolGrey-dark">ENTER PROFILE INFORMATION</label>
                </div>
              </section>
              <section className="w-full flex align-top justify-evenly items-start bg-grey-500 pt-24">
                <div className="w-full max-w-md bg-gray-800" >
                  <form action="" className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                    <InputText type = "text" border = "coolGreen" placeholder = "Name" label = "PREFERRED NAME"/>
                    <InputText type = "email" border = "coolGreen" placeholder = "example@gmail.com" label = "EMAIL ADDRESS"/>
                    <InputText type = "password" border = "coolGreen" placeholder = "examplePassword" label = "PASSWORD"/>
                    <DropDown name = "NOTIFICATION METHOD" option1 = "Text Message" option2 = "Email"/>
                    <DropDown name = "INFORMATION PUBLIC TO USERS" option1 = "Yes" option2 = "No"/>
                  </form>
                </div>
              </section>

              <section className="App min-h-0 w-full flex justify-evenly align-bottom items-center bg-grey-500 py-8">
                <div className="px-1 pb-1">
                  <NavLink to = "/">
                      <button className="bg-coolGreen hover:bg-coolGrey item-end justify-bottom text-white font-bold py-1 px-10 rounded focus:outline-none focus:shadow-outline " type="button">Create Account and Return to Login Page</button>
                  </NavLink>
                </div>
              </section>
          </div>

        )
    } 
}

export default createAccount