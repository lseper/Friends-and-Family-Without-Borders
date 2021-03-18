import React, { Component } from 'react';
import EventInvitationsButton from '../components/eventInvitationsButton';
import NavBar from '../components/navBar';
import Popup from '../components/popup'

export class homePage extends Component {

    constructor(props){  
        super(props);  
        this.state = { showPopup: false,
                        needFriends: false };  
    }

    componentDidMount() {
        // if a user is not logged in, brings them to the login page
        if(!localStorage['user_id'] && !localStorage['authToken']) {
            this.props.history.push('/');
            localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
        }

        //localStorage.setItem('filledOutQuestionnaire', false);
        console.log(localStorage.getItem('filledOutQuestionnaire'))
        const needPopup = localStorage.getItem('filledOutQuestionnaire') === "false";
        if(needPopup){
            this.setState({showPopup: true})
        }
        else{
            this.setState({showPopup: false})
        }
    }

    render() {      
        return (
            <div>
                <NavBar />
                {this.state.showPopup ?  
                    <div className = 'px-10 py-2 bg-coolGrey'>
                    <Popup  
                        text='You Must fill out and submit a Questionnaire questions before created an event.'  
                    />  
                    </div>
                    : null  
                } 
                    <div>   
                                    
                        <div className="App py-10 w-full flex justify-start px-2 items-coolGrey">
                            <label htmlFor="title" className="text-4xl block font-bold  pb-2 text-brightPink mb-2 ml-2">EVENT INVITATIONS</label>
                        </div> 
                        {this.state.needFriends === false & this.state.showPopup === false ? 
                            <div className ="flex grid grid-cols-1 flex place-items-left bg-coolGrey py-4">
                            
                                <EventInvitationsButton name = "Birthday Party" dateString = 'March 18th 2021' location = "Holmes Lake"/>
                                {/* <EventInvitationsButton name = "Family Gathering" dateString = 'March 20th 2021' location = 'Lazlos'/>
                                <EventInvitationsButton name = "Sand VolleyBall" dateString = 'March 24th 2021' location = "Holmes Lake" /> */}

                            </div>   
                            : null
                        }  


                        {this.state.needFriends | this.state.showPopup?  
                            <div className = "bg-white px-4 py-4">
                                <div className = "bg-coolBlue">
                                <label htmlFor="title" className="text-xl block font-bold  pb-6 text-white mb-2 ml-2 px-10 py-10">YOU CURRENTLY DO NOT HAVE ANY EVENT INVITATION YOU SHOULD MAKE SOME FRIENDS:)</label>
                                </div>  
                            </div>   
                            : null  

                        } 
 
                    </div>
                    <section className="App min-h-0 w-full flex justify-evenly align-bottom items-center bg-grey-500 py-8 px-4">
                    </section>
            
            </div>
        )
    } 
}

export default homePage