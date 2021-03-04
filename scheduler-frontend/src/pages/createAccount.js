import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class createAccount extends Component {

    render() {
        return (
            <section className="App h-20 w-full flex justify-center items-center bg-grey-500">
              <div className="px-1 pb-1 py-36">
                <NavLink to = "/">
                    <button className="bg-coolGreen hover:bg-coolGrey item-end justify-bottom text-white font-bold py-1 px-10 rounded focus:outline-none focus:shadow-outline " type="button">Return to Login Page</button>
                </NavLink>
              </div>
            </section>
        )
    } 
}

export default createAccount