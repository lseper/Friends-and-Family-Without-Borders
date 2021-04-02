import React, { Component } from 'react';
import EventInvitationsButton from '../components/eventInvitationsButton';
import NavBar from '../components/navBar';
import Alert from '../components/alert';

//will need when getting an invitations for a user from the database
const EventCard = ({ name, date, location, details }) => {
    return (
        <div className="flex grid grid-cols-1 flex place-items-left py-4">
            <EventInvitationsButton
                name={name}
                dateString={date}
                location={location}
                details={details} />
        </div>
    )
}

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            needFriends: true
        };
    }

    componentDidMount() {

        // if a user is not logged in, brings them to the login page
        if (!localStorage['user_id'] && !localStorage['authToken']) {
            this.props.history.push('/');
            localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
        }

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
                {this.state.showPopup ?
                    <div>
                        <Alert color="brightPink" message="You must fill out a questionaire" />
                    </div>
                    : null
                }
                {this.state.needFriends ?
                    <div>
                        <Alert color="brightPink" message="You currently do not have an event invitations, you should make some friends :)" />
                    </div>
                    : null
                }
                <div>
                    <section className="App py-5 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
                        <div className="px-1 mt-3">
                            <label htmlFor="title" className="text-3xl text-left block font-bold text-coolGrey-dark"> Event Invitations</label>
                            <label htmlFor="title" className="text-lg text-left block text-coolGrey-dark">Accept or decline your invitations</label>
                        </div>
                    </section>
                    {this.state.needFriends === false ?
                        <div className="flex grid grid-cols-1 flex place-items-left py-4">
                            {/* current hardcoded -- will change when implemented in the backend  */}
                            <EventInvitationsButton name="Birthday Party" dateString='March 18th 2021' location="Holmes Lake" details="Get ready to party because jayden is turning 24! We are very excited to be celebrating in a covid-friendly way. Please make sure to bring a coat, this is outdoors!" comfort="green" creator="Emily" />
                            <EventInvitationsButton name="Family Gathering" dateString='March 20th 2021' location="Lazlos" details="Just a get together for everyone to get to catch up and eat some great food!" comfort="red" creator="emily" />
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

export default HomePage;