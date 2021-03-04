import React, { Component } from 'react'
import TopBar from '../components/topBar';

import { NavLink } from 'react-router-dom';

export class homePage extends Component {
    onSubmit = () => {
        console.log("test");
        this.props.history.push('./pages/createAccount');
     }

    render() {
        return (
            <div>
                <TopBar />

                <div className="bg-coolGrey flex pt-5 pb-5 text-white text-2xl mb-12">
                    <NavLink to = "/homePage">
                        <button className="ml-5 hover:text-gray-300">←</button>
                    </NavLink>
                    <button className="mr-auto ml-auto font-bold">CREATE AN EVENT</button>
                </div>

                <label className="text-brightPink ml-14">EVENT NAME:</label>
                <div className="mb-5">
                    <input type="text" name="eventName" id="name" className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-brightPink ml-14 mt-3" placeholder="My Event" />
                </div>

                <label className="text-brightPink ml-14">EVENT DATE:</label>
                <div className="mb-5">
                    <button className="ml-14">📆</button>
                </div>

                <label className="text-brightPink ml-14">EVENT TIME:</label>
                <div className="mb-5">
                    <button className="ml-14">⌚</button>
                </div>
                
                <label className="text-brightPink ml-14">EVENT DESCRIPTION:</label>
                <div className="mb-5">
                    <textarea rows="5" type="text" name="eventDescription" id="description" className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-brightPink ml-14 mt-3" placeholder="Description" />
                </div>

                <label className="text-brightPink ml-14">INVITE LIST:</label>
                <div className="mb-5">
                    <input type="text" name="eventName" id="name" className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-brightPink ml-14 mt-3" placeholder="&#128270;" />
                    
                </div>
                <div className="text-lg ml-14">
                    <h1>JANE DOE | JDOE@GMAIL.COM</h1>
                    <h1>BOB SMITH | BOB.SMITH@ICLOUD.COM</h1>
                    <h1>JAMES KELLY | JKELLY@GMAIL.COM</h1>
                    <h1>WALTER GIBSON | WGIBSON@GMAIL.COM</h1>
                    <h1>HENRY WHITE | HENRYWHITE@GMAIL.COM</h1>
                    <h1>SAM CRAYNE | CRAYNES@GMAIL.COM</h1>
                </div>
                
                <div className="absolute bottom-0 right-14">
                    <button className="bg-coolGreen hover:bg-coolGreen-dark text-white font-bold py-1 px-10 rounded focus:outline-none focus:shadow-outline">CREATE EVENT</button>
                </div>
            </div>
        )
    } 
}

export default homePage