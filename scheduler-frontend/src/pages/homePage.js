import React, { Component } from 'react';
import EventInvitationsButton from '../components/eventInvitationsButton';
import NavBar from '../components/navBar';
import Alert from '../components/alert';
import CreatedEventButton from '../components/createdEventsButton';
import axios from 'axios';
import moment from "moment";


const EventCard = ({ name, dateStart, dateEnd, location, details,creator }) => {
    return (
        
        <div className="flex grid grid-cols-1 flex place-items-left py-4">
            <EventInvitationsButton
                name={name}
                dateStringStart={dateStart}
                dateStringEnd={dateEnd}
                location={location}
                details={details}
                comfort="red" 
                creator={creator} />
        </div>
    )
}

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            needFriends: true,
            loading: true,
            eventList: []
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

        const authorization = localStorage.getItem('authToken');
        axios.get(`/users/${localStorage['user_id']}/invitations`, {
            headers: {
                'Authorization': authorization
            }
        })
            .then(res => {
                console.log(res);
                this.setState({
                    eventList: res.data.map(event => {
                        return (<EventCard
                            name={event.event_details.name}
                            dateStart={moment(event.event_details.start_time).format("MMMM Do YYYY h:mm:ss a")}
                            dateEnd = {moment(event.event_details.ending_at).format("MMMM Do YYYY h:mm:ss a")}
                            location="temp"
                            details={event.event_details.description}
                            creator={event.organizer.username}
                            key={event.event_details.Authorizationid}
                        />)
                    }),
                    loading: false,
                })
            }).then(() => {
                console.log(this.state);
            }).catch(err => {
                console.log(err);
                this.setState({ loading: false })
            })

            //console.log(this.state.eventList);
    }

    render() {
        return (
            <div>
                <NavBar />
                {this.state.eventList.length === 0 ?
        
                    <div>
                        <Alert color="brightPink" message="You currently have no event invitations, you should make some friends:)" />
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
                    <div>
                        {this.state.eventList}
                    </div>
                </div>
                <section className="App min-h-0 w-full flex justify-evenly align-bottom items-center bg-grey-500 py-8 px-4">
                </section>

            </div>
        )
    }
}

export default HomePage;