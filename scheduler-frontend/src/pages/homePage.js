import React, { Component } from 'react'
import CreatedEventsButton from '../components/createdEventsButton';
import EventInvitationsButton from '../components/eventInvitationsButton';

import { NavLink } from 'react-router-dom';

export class homePage extends Component {
    onSubmit = () => {
        console.log("test");
        this.props.history.push('./pages/createAccount');
     }

    render() {
        return (
            <div className="flex">

                <div className="mr-auto ml-auto">
                    <label htmlFor="title" className="text-5xl block font-bold  pb-2 text-coolGrey-dark mb-2">Created Events</label>
                    <button className="bg-coolBlue py-1 px-5 rounded hover:bg-coolBlue-dark font-bold text-white focus:outline-none focus:shadow-outline">+ CREATE EVENT</button>
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
        )
    } 
}

export default homePage