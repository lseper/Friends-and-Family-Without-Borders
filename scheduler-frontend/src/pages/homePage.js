import React, { Component } from 'react';
import EventInvitationsButton from '../components/eventInvitationsButton';
import NavBar from '../components/navBar';

export class homePage extends Component {
    render() {      
        return (
            <div>
                <NavBar />
                <div>                   
                    <div className="App py-10 w-full flex justify-start px-2 items-coolGrey">
                        <label htmlFor="title" className="text-4xl block font-bold  pb-2 text-brightPink mb-2 ml-2">EVENT INVITATIONS</label>
                    </div> 
                    <div className ="flex grid grid-cols-1 flex place-items-left bg-coolGrey py-4">
                        
                        <EventInvitationsButton />
                        <EventInvitationsButton />
                        <EventInvitationsButton />
                        <EventInvitationsButton />
                        <EventInvitationsButton />
                        <EventInvitationsButton /> 
                       
                        <label htmlFor="title" className="text-xl block font-bold  pb-2 text-white mb-2 ml-2 px-10 py-10">YOU CURRENTLY DO NOT HAVE ANY EVENT INVITATION YOU SHOULD MAKE SOME FRIENDS:)</label>
                    </div>        
                </div>
              <section className="App min-h-0 w-full flex justify-evenly align-bottom items-center bg-grey-500 py-8 px-4">
              </section>
            </div>
        )
    } 
}

export default homePage