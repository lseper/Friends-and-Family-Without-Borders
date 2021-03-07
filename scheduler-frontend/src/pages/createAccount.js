import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import DropDown from '../components/dropDown';

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
                    <div className="px-4 pb-4">
                      <label htmlFor="text" className="text-sm block font-bold  pb-2 text-coolGrey-dark">PREFERRED NAME</label>
                      <input type="text" name="text" id="" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-coolGreen " placeholder="John Bull" />
                    </div>
                    <div className="px-4 pb-4">
                      <label htmlFor="email" className="text-sm block font-bold  pb-2 text-coolGrey-dark">EMAIL ADDRESS</label>
                      <input type="email" name="email" id="" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-coolGreen " placeholder="Johnbull@example.com" />
                    </div>
                    <div className="px-4 pb-4">
                      <label htmlFor="password" className="text-sm block font-bold pb-2 text-coolGrey-dark">PASSWORD</label>
                      <input type="password" name="email" id="" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-coolGreen" placeholder="Enter your password" />
                    </div>
                  </form>
                </div>
              </section>
              
              <section className="w-full flex align-middle justify-center items-center bg-grey-500 pt-8">
                <div className="w-full max-w-md bg-gray-800" >
                  <form action="" className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                  <div>
                      <DropDown color = "white" name = "Notification Method" option1 = "Text Message" option2 = "Email"/>
                    </div>
                    <div>
                      <DropDown color = "white" name = "Information Public to Users" option1 = "Yes" option2 = "No"/>
                    </div>
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