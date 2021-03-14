import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import DropDown from '../components/dropDown';
import InputText from '../components/inputText';
import { withRouter } from "react-router";
import GreenButton from '../components/greenButton'

export class createAccount extends Component {

    render() {
    //add functinoality, if the user had already filled out the questionnaire
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
                    <InputText type = "text" border = "coolGreen" placeholder = "Name" label = "PREFERRED NAME"/>
                    <InputText type = "email" border = "coolGreen" placeholder = "example@gmail.com" label = "EMAIL ADDRESS"/>
                    <InputText type = "password" border = "coolGreen" placeholder = "examplePassword" label = "PASSWORD"/>
                    <DropDown name = "NOTIFICATION METHOD" option1 = "Text Message" option2 = "Email"/>
                    <DropDown name = "INFORMATION PUBLIC TO USERS" option1 = "Yes" option2 = "No"/>
                    &nbsp;&nbsp;&nbsp;
                    <div className = "flex justify-evenly align-center items-center">
                      <NavLink to = "/homePage">
                        <GreenButton name = "Create Account" />                        
                      </NavLink>
                  </div>
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