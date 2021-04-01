import React, { Component } from 'react';
import EventInvitationsButton from '../components/eventInvitationsButton';
import NavBar from '../components/navBar';

export class homePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            needFriends: false
        };
    }

    componentDidMount() {
        // if a user is not logged in, brings them to the login page
        if (!localStorage['user_id'] && !localStorage['authToken']) {
            this.props.history.push('/');
            localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
        }
        //console.log(localStorage.getItem('filledOutQuestionnaire'))
        const needPopup = localStorage.getItem('filledOutQuestionnaire') === "false";
        if (needPopup) {
            this.setState({ showPopup: true })
        }
        else {
            this.setState({ showPopup: false })
        }
    }

    render() {
        return (
            <div>
                <NavBar />
                <div>
                    <section className="App py-5 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
                        <div className="px-1 pb-1">
                            <label htmlFor="title" className="text-3xl text-left block font-bold pb-2 text-coolGrey-dark"> EVENT INVITATIONS</label>
                        </div>
                        <div className="px-1">
                            <label htmlFor="title" className="text-xl text-left block font-bold pb-2 text-coolGrey-dark border-l-2 border-coolGrey"> Details</label>
                        </div>
                        {this.state.showPopup ?
                            <div className="px-1">
                                <label htmlFor="title" className="text-xl text-left block font-bold pb-2 text-brightPink border-l-2 border-brightPink"> You must fill out a questionnaire</label>
                            </div>
                            : null
                        }
                    </section>
                    {this.state.needFriends === false ?
                        <div className="flex grid grid-cols-1 flex place-items-left py-4">
                            <EventInvitationsButton name="Birthday Party" dateString='March 18th 2021' location="Holmes Lake" details="Get ready to party because jayden is turning 24! We are very excited to be celebrating in a covid-friendly way. Please make sure to bring a coat, this is outdoors!" comfort="green" creator = "Emily"/>
                            <EventInvitationsButton name="Family Gathering" dateString='March 20th 2021' location="Lazlos" details="Just a get together for everyone to get to catch up and eat some great food!" comfort="red" creator = "emily"/>
                            {/* <EventInvitationsButton name = "Family Gathering" dateString = 'March 20th 2021' location = 'Lazlos'/>
                                <EventInvitationsButton name = "Sand VolleyBall" dateString = 'March 24th 2021' location = "Holmes Lake" /> */}
                        </div>
                        : null
                    }

                    {this.state.needFriends ?
                        <div>
                            <div className="flex flex-grow align-start items-start py-4 px-5 w-full" >
                                <form action="" className="flex flex-grow grid grid-cols-1 justify-start align-left items-left bg-white shadow-lg rounded px-5 py-4 container bg-white">
                                    <label htmlFor="title" className="text-left text-md block font-bold pb-10 text-coolGrey-dark mb-2">You currently have no invitations, you should make some friends :) </label>
                                </form>
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