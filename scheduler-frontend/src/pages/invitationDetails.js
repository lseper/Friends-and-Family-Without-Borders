import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class invitationDetails extends Component {

    render() {
        return (
            <div>
                <div className="bg-coolGrey flex pt-5 pb-5 text-white text-2xl mb-12 shadow-xl hover:shadow-md">
                    <NavLink to = "/homePage">
                        <button className="ml-5 hover:text-gray-300">←</button>
                    </NavLink>
                    <button className="mr-auto ml-auto font-bold">BIRTHDAY PARTY</button>
                </div>
                <div className ="flex grid grid-cols-1 flex place-items-left bg-brightPink py-4">
                    <div className="w-9/10 bg-brightPink m-2 h-full" >
                        <div className="bg-white shadow-md rounded px-8 py-8 pt-8 ">
                            <div>
                                <p className="text-xl font-bold text-coolGrey-dark">COMFORT:</p>
                                <p className="text-xl font-bold text-coolGrey-dark">7.8 </p>
                            </div> 
                        </div>
                    </div>
                    <div className="w-9/10 bg-brightPink m-2 h-full" >
                        <div className="bg-white shadow-md rounded px-8 py-8 pt-8 py-2">
                            <div>
                                <h2 className="text-xl font-bold text-coolGrey-dark">DESCRIPTION:</h2>
                            </div>
                            <div>
                                <p className="text-sm font-bold text-coolGrey-dark">Get ready to party because jayden is turning 24! We are very excited to be celebrating in a covid-friendly way. Please make sure to bring a coat, this is outdoors!</p>
                            </div>
                            
                        </div>
                    </div>
                        <div className="w-9/10 bg-brightPink m-2 h-full" >
                        <div className="bg-white shadow-md rounded px-8 py-8 pt-8 ">
                            <div>
                                <p className="text-xl font-bold text-coolGrey-dark">DATE: </p>
                                <p className="text-sm font-bold text-coolGrey-dark">March 18th 2021 </p>
                            </div>
                            <div>
                                <p className="text-xl font-bold text-coolGrey-dark">TIME: </p>
                                <p className="text-sm font-bold text-coolGrey-dark">T7:00 PM</p>
                            </div>
                        </div>
                        </div>
                    <div className="w-9/10 bg-brightPink m-2 h-full" >
                        <div className="bg-white shadow-md rounded px-8 py-8 pt-8 ">
                            <div>
                                <p className="text-xl font-bold text-coolGrey-dark">LOCATION: </p>
                                <p className="text-sm font-bold text-coolGrey-dark">Holmes Lake </p>
                            </div> 
                        </div>
                    </div>
                    <div className="w-9/10 bg-brightPink m-2 h-full" >
                        <div className="bg-white shadow-md rounded px-8 py-8 pt-8 ">
                            <div>
                                <p className="text-xl font-bold text-coolGrey-dark">RESPONSE: </p>
                                <p className="text-sm font-bold text-coolGrey-dark">pending </p>
                                
                            </div> 
                        </div>
                    </div>
                </div> 

                
                <section className="App min-h-0 w-full flex justify-evenly align-bottom items-center bg-grey-500 py-8 px-4">
                </section>

            </div>
        )
    } 
}

export default invitationDetails;