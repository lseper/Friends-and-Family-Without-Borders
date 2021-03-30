import React, { Component } from 'react';
import CreatedEventButton from '../components/createdEventsButton';
import NavBar from '../components/navBar';

import { NavLink } from 'react-router-dom';


//react function component
const EventCard = ({name, date, location, details}) => {
    return(
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
            createdEvents: true,
            eventList: []
        };
    }

    componentDidMount() {
        const fakeArray = 
            [
                {name: 'Birthday', date: '04/28,2021', location: 'Holmes', details: 'Come to Holmes Lake!' },
                {name: 'Dan', date: '04/28,2021', location: 'Lincoln', details: 'Come to Holmes Holmesmalsdkfjas;dkfjas!' },
                {name: 'Emily', date: '04/28,2021', location: 'Omaha', details: 'Come to Holmes home I think this is going to make things look weird!' },
                {name: 'Michael', date: '04/28,2021', location: 'AZ', details: 'Come to Holmes Pary!' }
            ]

        // if a user is not logged in, brings them to the login page
        if (!localStorage['user_id'] && !localStorage['authToken']) {
            this.props.history.push('/');
            localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
        }
        const eventsFromArray = fakeArray.map(event => {
            return (<EventCard 
                        name={event.name} 
                        date={event.date}
                        location={event.location}
                        details={event.details}
                        />)
        })

        this.setState({eventList: eventsFromArray})
    }

    render() {
        return (
            <div>
                <NavBar />
                <div>
                    <section className="App py-5 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-full">
                        <div className="px-1 pb-1">
                            <label htmlFor="title" className="text-3xl text-left block font-bold pb-2 text-coolGrey-dark"> CREATED EVENTS</label>
                        </div>
                        <div className="flex px-1 pb-1 align-start">
                            <NavLink to="/createEvent">
                                <button className=" bg-coolBlue py-2 px-5 text-left rounded hover:bg-coolBlue-dark hover:shadow-md font-bold text-white focus:outline-none focus:shadow-outline shadow-xl">+ CREATE EVENT</button>
                            </NavLink>
                        </div>
                        <div>

                        </div>
                        {this.state.createdEvents === false ?
                            <div>
                                <div className="flex flex-grow align-start items-start py-4 w-full" >
                                    <form action="" className="flex flex-grow grid grid-cols-1 justify-start align-left items-left bg-white shadow-lg rounded px-5 py-4 container bg-white">
                                        <label htmlFor="title" className="text-left text-md block font-bold pb-10 text-coolGrey-dark mb-2">You currently have no created events </label>
                                    </form>
                                </div>
                            </div>
                            : null

                        }
                    </section>

                    {this.state.createdEvents ?
                    <div>
                        {this.state.eventList}
                    </div>
                        : null
                    }

                </div>
            </div>





        )
    }
}

export default createdEvents