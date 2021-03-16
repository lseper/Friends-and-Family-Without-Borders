import React, { Component } from 'react';
import CreatedEventButton from '../components/createdEventsButton';
import NavBar from '../components/navBar';

import { NavLink } from 'react-router-dom';

export class homePage extends Component {
    render() {
        return (
            <div>
                <NavBar />
                <div>                   
                    <div className="App pt-10 w-full flex justify-start px-2 items-coolGrey">
                        <label htmlFor="title" className="text-4xl text-left block font-bold  pb-2 text-brightPink mb-2 ml-2 px-2" >CREATED EVENTS</label>
                    </div> 
                    <div className = "pb-10 px-2">
                        <NavLink to = "/createEvent">
                            <button className=" bg-coolBlue py-2 px-5 rounded hover:bg-coolBlue-dark hover:shadow-md font-bold text-white focus:outline-none focus:shadow-outline shadow-xl ml-2">+ CREATE EVENT</button>
                        </NavLink>
                    </div>

                    <div className ="flex grid grid-cols-1 flex place-items-left bg-coolGrey py-4">
                        
                        <CreatedEventButton />
                        <CreatedEventButton />
                        <CreatedEventButton />
                        <CreatedEventButton />
                        <CreatedEventButton />
                        <CreatedEventButton />
                       
                        {/* <label htmlFor="title" className="text-xl block font-bold  pb-2 text-white mb-2 ml-2 px-10 py-10">YOU CURRENTLY HAVE NOT MADE ANY EVENTS</label> */}
                    </div>        
                </div>
              <section className="App min-h-0 w-full flex justify-evenly align-bottom items-center bg-grey-500 py-8 px-4">
              </section>
            </div>


                    

 
        )
    } 
}

export default homePage