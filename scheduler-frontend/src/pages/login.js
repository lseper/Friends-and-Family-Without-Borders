import React, { Component } from 'react'

import { NavLink } from 'react-router-dom';

export class login extends Component {

     //plain object with just a user name and a password -- to send to backend 
     //will depend on the backend -- dictionary representation 

    render() {
        return (
            <div>
            <section className="App h-20 w-full flex justify-center items-center bg-grey-500">
              <div className="px-1 pb-1 py-36">
                  <label htmlFor="title" className="text-3xl block font-bold  pb-2 text-coolGrey-dark">WELCOME</label>
              </div>
            </section>
            <section className="App h-screen w-full flex justify-center items-start bg-grey-500 py-48">
              <div className="w-full max-w-md bg-gray-800" >
                <form action="" className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                  <div className="px-4 pb-4">
                    <label htmlFor="email" className="text-sm block font-bold  pb-2 text-coolGrey-dark">EMAIL ADDRESS</label>
                    <input type="email" name="email" id="" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-coolGreen " placeholder="Johnbull@example.com" />
                  </div>
                  <div className="px-4 pb-4">
                    <label htmlFor="password" className="text-sm block font-bold pb-2 text-coolGrey-dark">PASSWORD</label>
                    <input type="password" name="email" id="" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-coolGreen" placeholder="Enter your password" />
                  </div>
                  <div>
                    <NavLink to = "/homePage">
                    <button className="bg-coolGreen hover:bg-coolGrey hover:shadow-md text-white font-bold py-1 px-10 rounded focus:outline-none focus:shadow-outline shadow-xl" type="button">Sign In</button>
                    </NavLink>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div className="px-4">
                    <p className="text-sm text-coolGrey-dark font-sans py-1 px-10 rounded focus:outline-none focus:shadow-outline" >
                      Forgot your password? 
                      <NavLink to = "/createAccount">
                          <button className="hover:text-coolBlue-dark text-coolBlue"> Click here</button>
                      </NavLink>
                    </p>
                    <p className="text-sm text-coolGrey-dark font-sans py-1 px-10 rounded focus:outline-none focus:shadow-outline" >
                      Don't have an account? 
                      <NavLink to = "/createAccount">
                          <button className="hover:text-coolBlue-dark text-coolBlue"> Sign up here</button>
                      </NavLink>
                    </p>
                  </div>
                </form>
                </div>
              </section>
          </div>
        )
    } 
}

export default login