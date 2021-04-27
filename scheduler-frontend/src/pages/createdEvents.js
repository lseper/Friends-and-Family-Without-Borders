import React, { Component } from 'react';
import CreatedEventButton from '../components/createdEventsReport';
import NavBar from '../components/navBar';
import axios from 'axios';
import Loading from '../components/loading';
import { NavLink } from 'react-router-dom';
import Alert from '../components/alert';
import moment from "moment"

const EventCard = ({ name, dateStart, dateEnd, location, details, invitees,comfort, numComfort, activity, eventId, maskRequired}) => {
    return (
        <div className="flex grid grid-cols-1 flex place-items-left py-4">
            <CreatedEventButton
                name={name}
                dateStart={dateStart}
                dateEnd={dateEnd}
                location={location}
                activity = {activity}
                details={details} 
                invitees={invitees}
                comfort={comfort}
                numComfort={numComfort}
                eventId = {eventId}
                maskRequired = {maskRequired}
                />
        </div>
    )
}

export class CreatedEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            loading: true,
            showPopup: false,
        };
    }

    convertToPercentage = (num) => {
        return(Math.floor((num) * 100));
    }

    componentDidMount = () => {
        // if a user is not logged in, brings them to the login page
        if (!localStorage['user_id'] && !localStorage['authToken']) {
            this.props.history.push('/');
            localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
        }
        const needPopup = (localStorage.getItem('filledOutQuestionnaire') === "false");
        if (needPopup) {
            this.setState({ showPopup: true })
        }
        else {
            this.setState({ showPopup: false })
        }

        const authorization = localStorage.getItem('authToken');
        axios.get(`/users/${localStorage['user_id']}/events`, {
            headers: {
                'Authorization': authorization
            }
        })
            .then(res => {
                console.log(res);
                
                this.setState({
            
                    eventList: res.data.map(event => {

                        let location = "";
                        let activity = ""
                        if(event.location == null){
                            location = "No Location Specified";
                            activity = "or Activity"
                        }else {
                            location = event.location.location_type;
                            activity = event.activity.name
                        }
      
                        return (<EventCard
                            name={event.event.name}
                            //moment(dateString).format("MMMM Do YYYY h:mm:ss a")
                            dateStart={moment(event.event.start_time).format("MMMM Do YYYY h:mm:ss a")}
                            dateEnd={moment(event.event.ending_at).format("MMMM Do YYYY h:mm:ss a")}
                            location={location}
                            activity = {activity}
                            details={event.event.description}
                            invitees={event.invitees}
                            eventId={event.event.id}
                            comfort={this.convertToPercentage(event.overall_comfort_metric)}
                            numComfort={event.people_comfortable}
                            maskRequired = {event.event.masks_required}
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
                        <Alert color="coolBlue" message="You currently have no created events, you should expand your friend circle!" />
                    </div>
                    : null
                }
                <div>
                    <div className="py-5 px-6 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-full">
                        <label htmlFor="title" className="text-3xl text-left block font-bold text-coolGrey-dark"> Created Events</label>
                        <label htmlFor="title" className="text-lg text-left block text-coolGrey-dark mb-4">Create and view your events</label>
                        <NavLink to="/createEvent">
                            <button className=" bg-coolBlue py-2 px-5 text-left rounded hover:bg-coolBlue-dark hover:shadow-md font-bold text-white focus:outline-none focus:shadow-outline shadow-xl ">+ CREATE EVENT</button>
                        </NavLink>
                    </div>
                    <div>
                        {this.state.eventList}
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatedEvents;