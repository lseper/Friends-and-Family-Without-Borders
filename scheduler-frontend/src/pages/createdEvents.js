import React, { Component } from 'react';
import CreatedEventButton from '../components/createdEventsButton';
import NavBar from '../components/navBar';

import { NavLink } from 'react-router-dom';

export class createdEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createdEvents: false
        };
    }

    componentDidMount() {
        // if a user is not logged in, brings them to the login page
        if (!localStorage['user_id'] && !localStorage['authToken']) {
            this.props.history.push('/');
            localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <div>
                    <section className="App py-5 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-full">
                        <div className="px-1 pb-1">
                            <label htmlFor="title" className="text-3xl text-left block font-bold pb-2 text-coolGrey-dark"> CREATED EVENTS</label>
                        </div>
                        <div className="flex px-1 pb-1 align-start">
                            <NavLink to="/createEvent">
                                <button className=" bg-coolBlue py-2 px-5 text-left rounded hover:bg-coolBlue-dark hover:shadow-md font-bold text-white focus:outline-none focus:shadow-outline shadow-xl">+ CREATE EVENT</button>
                            </NavLink>
                        </div>
                        <div>

                        </div>
                        {this.state.createdEvents === false ?
                            <div>
                                <div className="flex flex-grow align-start items-start py-4 w-full" >
                                    <form action="" className="flex flex-grow grid grid-cols-1 justify-start align-left items-left bg-white shadow-lg rounded px-5 py-4 container bg-white">
                                        <label htmlFor="title" className="text-left text-md block font-bold pb-10 text-coolGrey-dark mb-2">You currently have no created events </label>
                                    </form>
                                </div>
                            </div>
                            : null

                        }
                    </section>

                    {this.state.createdEvents ?
                        <div className="flex grid grid-cols-1 flex place-items-left py-4">
                            <CreatedEventButton 
                            name="Birthday Party" 
                            dateString='March 18th 2021' 
                            location="Holmes Lake" 
                            details="Come to Holmes Lake for Courtney's Birthday Party! There will be food and plently of ourdoor games!" />
                        </div>
                        : null
                    }

                </div>
            </div>





        )
    }
}

export default createdEvents