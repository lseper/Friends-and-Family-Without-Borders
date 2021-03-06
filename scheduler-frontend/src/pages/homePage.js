import React, { Component } from 'react';
import EventInvitationsReport from '../components/eventInvitationsReport';
import NavBar from '../components/navBar';
import Alert from '../components/alert';
import axios from 'axios';
import moment from "moment";
import Loading from '../components/loading'


const EventCard = ({ name, dateStart, dateEnd, location, details, creator, attending, id, activity, comfort, invitees, maskRequired }) => {
    return (
        <div className="flex grid grid-cols-1 flex place-items-left py-4">
            <EventInvitationsReport
                name={name}
                dateStringStart={dateStart}
                dateStringEnd={dateEnd}
                location={location + " - " + activity}
                details={details}
                creator={creator} 
                attending = {attending}
                invitationId = {id}
                comfort = {comfort}
                invitees = {invitees}
                maskRequired = {maskRequired}
                />
        </div>
    )
}

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            needFriends: true,
            eventList: [], 
            loading: true
        };
    }

    componentDidMount = () => {

        // if a user is not logged in, brings them to the login page
        if (!localStorage['user_id'] && !localStorage['authToken']) {
            this.props.history.push('/');
            localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
        }

        const authorization = localStorage.getItem('authToken');
        axios.get(`/users/${localStorage['user_id']}/invitations`, {
            headers: {
                'Authorization': authorization
            }
        })
            .then(res => {
                this.setState({
                    // loop through each event invitation returned from the backend
                    eventList: res.data.map(event => {

                        // handle if location and activity are null 
                        let location = "";
                        let activity = "";
                        let comfort = "";

                        // if location is null then activity, comfort, and numComfort are not applicable for the user 
                        if(event.location == null){
                            location = "No Location Specified";
                            activity = "or Activity"
                            comfort = "N/A"
                        } else {
                            location = event.location.location_type;
                            activity = event.activity.name
                            comfort = event.comfort_level;
                        }

                        // pass to event report component 
                        return (<EventCard
                            name={event.event_details.name}
                            dateStart={moment(event.event_details.start_time).format("MMMM Do YYYY h:mm:ss a")}
                            dateEnd = {moment(event.event_details.ending_at).format("MMMM Do YYYY h:mm:ss a")}
                            location={location}
                            details={event.event_details.description}
                            creator={event.organizer.username}
                            key={event.event_details.Authorizationid}
                            attending = {event.confirmed}
                            id = {event.id}
                            activity = {activity}
                            comfort = {comfort}
                            invitees = {event.invitees}
                            maskRequired = {event.event_details.masks_required}
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
    }

    render() {
        return (
            <div>
                {this.state.loading ?
                    <Loading /> :
                    null
                }
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
                            <label htmlFor="title" className="text-lg text-left block text-coolGrey-dark">Accept or decline your invitations (100% is most comfortable)</label>
                        </div>
                    </section>
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