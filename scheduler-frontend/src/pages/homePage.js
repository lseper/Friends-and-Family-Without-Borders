import React, { Component } from 'react';
import CreatedEventsButton from '../components/createdEventsButton';
import EventInvitationsButton from '../components/eventInvitationsButton';
import NavBar from '../components/navBar';
import TopBar from '../components/topBar';

import { NavLink } from 'react-router-dom';

export class homePage extends Component {
    render() {
        return (
            <div>
                <TopBar />
                <NavBar />
                <div className="flex">

                    <div className="mr-auto ml-auto">
                        <label htmlFor="title" className="text-5xl block font-bold  pb-2 text-coolGrey-dark mb-2">Created Events</label>
                        <NavLink to = "/createEvent">
                            <button className="bg-coolBlue py-1 px-5 rounded hover:bg-coolBlue-dark hover:shadow-md font-bold text-white focus:outline-none focus:shadow-outline shadow-xl">+ CREATE EVENT</button>
                        </NavLink>
                        <CreatedEventsButton />
                        <CreatedEventsButton />
                        <CreatedEventsButton />
                        <CreatedEventsButton />
                        <CreatedEventsButton />
                        <CreatedEventsButton />
                        <CreatedEventsButton />
                        <CreatedEventsButton />
                        <CreatedEventsButton />
                    </div>
                    
                    <div className="mr-auto ml-auto">
                        <label htmlFor="title" className="text-5xl block font-bold  pb-2 text-brightPink mb-2">Event Invitations</label>
                        <EventInvitationsButton />
                        <EventInvitationsButton />
                        <EventInvitationsButton />
                        <EventInvitationsButton />
                        <EventInvitationsButton />
                        <EventInvitationsButton />
                    </div> 
                    
                </div>
            </div>
        )
    } 
}

export default homePage