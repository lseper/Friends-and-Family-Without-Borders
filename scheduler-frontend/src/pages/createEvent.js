import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class homePage extends Component {

    render() {
        return (
            <div>
                <div className="bg-coolGrey flex pt-5 pb-5 text-white text-2xl mb-12 shadow-xl hover:shadow-md">
                    <NavLink to = "/createdEvents">
                        <button className="ml-5 hover:text-gray-300">←</button>
                    </NavLink>
                    <button className="mr-auto ml-auto font-bold">CREATE AN EVENT</button>
                </div>

                <label className="text-brightPink ml-10">EVENT NAME:</label>
                <div className="mb-5">
                    <input type="text" name="eventName" id="name" className="shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-brightPink ml-10 mt-3 mr-14" placeholder="My Event" />
                </div>

                <label className="text-brightPink ml-10">EVENT DATE:</label>
                <div className="mb-5">
                    <button className="ml-10">📆</button>
                </div>

                <label className="text-brightPink ml-10">EVENT TIME:</label>
                <div className="mb-5">
                    <button className="ml-10">⌚</button>
                </div>
                
                <label className="text-brightPink ml-10">EVENT DESCRIPTION:</label>
                <div className="mb-5">
                    <textarea rows="5" type="text" name="eventDescription" id="description" className="shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-brightPink ml-10 mt-3" placeholder="Description" />
                </div>

                <label className="text-brightPink ml-10">INVITE LIST:</label>
                <div className="mb-5">
                    <input type="text" name="eventName" id="name" className="shadow appearance-none border rounded w-4/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-brightPink ml-10 mt-3" placeholder="&#128270;" />
                    
                </div>
                <div className="text-md ml-10">
                    <h1>JANE DOE | JDOE@GMAIL.COM</h1>
                    <h1>BOB SMITH | BOB.SMITH@ICLOUD.COM</h1>
                    <h1>JAMES KELLY | JKELLY@GMAIL.COM</h1>
                    <h1>WALTER GIBSON | WGIBSON@GMAIL.COM</h1>
                    <h1>HENRY WHITE | HENRYWHITE@GMAIL.COM</h1>
                    <h1>SAM CRAYNE | CRAYNES@GMAIL.COM</h1>
                </div>
                
                <div className="mb-10 mt-5">
                    <button className="bg-coolGreen hover:bg-coolGreen-dark hover:shadow-md text-white font-bold py-1 px-10 rounded focus:outline-none focus:shadow-outline shadow-xl inline-block align-middle w-full">CREATE EVENT</button>
                </div>
            </div>
        )
    } 
}

export default homePage;