import React, { Component } from 'react';
import CreatedEventButton from '../components/createdEventsButton';
import NavBar from '../components/navBar';
import axios from 'axios';
import Loading from '../components/loading';
import Alert from '../components/alert';
import { NavLink } from 'react-router-dom';

const EventCard = ({ name, date, location, details }) => {
    return (
        <div className="flex grid grid-cols-1 flex place-items-left py-4">
            <CreatedEventButton
                name={name}
                dateString={date}
                location={location}
                details={details} />
        </div>
    )
}

export class createdEvents extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventList: [],
            loading: true,
        };
    }

    componentDidMount() {
        // if a user is not logged in, brings them to the login page
        if (!localStorage['user_id'] && !localStorage['authToken']) {
            this.props.history.push('/');
            localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
        }

        const authorization = localStorage.getItem('authToken');
        axios.get(`/users/${localStorage['user_id']}/events`, {
            headers: {
                'Authorization': authorization
            }
        })
            .then(res => {
                this.setState({
                    eventList: res.data.map(event => {
                        return (<EventCard
                            name={event.name}
                            dateStart={event.start_time}
                            dateEnd={event.ending_at}
                            location="temp"
                            details={event.description}
                            creator="temp"
                            key={event.id}
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
                <NavBar />
                {this.state.eventList.length === 0 ?
                    <div>
                        <Alert color="brightPink" message="You currently have no created events" />
                    </div>
                    : null
                }
                {this.state.loading ?
                    <Loading /> :
                    null
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

export default createdEvents