import { NavLink } from 'react-router-dom';
import Modal from '../components/model';
import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from 'axios';
import NavBar from '../components/navBar';
import InputTextFormBlue from '../components/inputTextFormBlue';
import DateSelect from '../components/dateSelect';
import SearchSelect from '../components/searchSelect';

const ShowLocationSuggestions = ({ location, activity, handleLocation }) => {
    return (
        <div>    
            <button onClick={() => handleLocation(location, activity)} className="ml-4 bg-coolGreen text-black active:bg-coolBlue font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg mb-2 align-start md:w-3/4 w-3/4">{location + " - " + activity}</button>
        </div>
    )
}

const SetErrors = ({ error }) => {
    return (
        <div>
            <label className="items-center font-medium tracking-wide text-red-400 text-md mt-1 ml-4">{error !== undefined ? 'An error occurred: ' : ''}{error}</label>
        </div>
    )
}

const CreateEvent = () => {

    const [name, setName] = useState();
    const [details, setDetails] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState();
    const [activity, setActivity] = useState();
    const [data] = useState([]);
    const [invitees, setInvitees] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [locationInfo, setLocationInfo] = useState([]);
    const [locationList, setLocationList] = useState([]);
    const [error, setError] = useState();
    const [showError, setShowError] = useState([]);

    useEffect(() => {
        if(data.length === 0){
            axios.get('/users').then(res => {
                for (let i = 0; i < res.data.length; i++){
                    if (res.data[i].id !== parseInt(localStorage['user_id'])){
                        data.push({
                            "value":res.data[i].id, 
                            "label": res.data[i].username
                        });
                    }
                }
            }).catch(err => {
                console.log(err.response.data);
            })
        }
    }, [data]);

    useEffect(() => {
        setLocationList(
          locationInfo.map(location => {
              return (<ShowLocationSuggestions
                  location={location.location.location_type}
                  activity={location.activity.name}
                  handleLocation={handleLocation}
                  key={location.location.location_type + '' + location.activity.name}
              />
              )
          }
          )
        )
    }, [locationInfo]);

    useEffect(() => {
        setShowError( <SetErrors error={error} /> )
    }, [error]);

    function addInvitees (eventId) {
        // get indexes of invitees who are priority
        let priorityIndexes = [];
        for (let i = 0; i < invitees.length; i++){
            for (let j = 0; j < priorities.length; j++){
                if(invitees[i] === priorities[j]){
                    priorityIndexes.push(i);
                }
            }
        }

        let finalInviteesList = [];
        for (let i = 0; i < invitees.length; i++) {
            if (priorityIndexes.includes(i)) {
                finalInviteesList.push({
                    user_id: invitees[i].value,
                    priority: true
                })
            } else {
                finalInviteesList.push({
                    user_id: invitees[i].value,
                    priority: false
                })
            }
        }
        
        let finalInvitees = ({
            user_id: localStorage.getItem('user_id'),
            event_id: eventId,
            invitees: finalInviteesList
        })

        const authorization = localStorage.getItem('authToken');
        axios.post(`/invitations`, finalInvitees, {
            headers: {
                'Authorization': authorization
            }
        })
        .then(res => {
            console.log("You correctly added invitees!")
            setLocationInfo(res.data.pairs);
            console.log("after invitees invited: " + locationInfo)
            setError(undefined);
        }).catch(err => {
            console.log("There was an error!")
            console.log(err.response.data);
            setError(err.response.data.name[0]);
        })
    }

    async function buildPost() {
        let eventInfo = {
            name: name,
            description: details,
            start_time: startDate,
            ending_at: endDate,
            masks_required: false
        }
        let eventId = -1;

        const authorization = localStorage.getItem('authToken');
        await axios.post(`/users/${localStorage['user_id']}/events`, eventInfo, {
            headers: {
                'Authorization': authorization
            }
        }).then(res => {
                console.log(res)
                eventId = res.data.id;    
                console.log(eventId);  
                //then add invites and submit another post request 
                addInvitees(eventId);
                setError(undefined);
            }).catch(err => {
                console.log("Something went wrong when creating an event");
                console.log(err.response.data);
                setError(err.response.data.name[0]);
            }) 
    };

    // function addLocationActivity(eventId) {
    //     let finalLocationAcitivty = ({
    //         event_id: eventId,
    //         location: "",
    //         activity: ""
    //     })

    //     const authorization = localStorage.getItem('authToken');

    //     await axios.put(`/users/${localStorage['user_id']}/events`, eventInfo, {
    //         headers: {
    //             'Authorization': authorization
    //         }
    //     })
    //         .then(res => {   
    //             console.log("You successfuly choose a location and activity");
    //         }).catch(err => {
    //             console.log("Something went wrong when creating an event");
    //             console.log(err.response.data);
    //         }) 
    // }

    function testDateTimes() {
        // made sure that dates and times are not equal 
        let createEvent = true;
        const startDateString = moment(startDate).format("MMMM Do YYYY hh:mm:ss");
        const endDateString = moment(endDate).format("MMMM Do YYYY hh:mm:ss")
        if (startDateString === endDateString) {
            console.log("test")
            createEvent = false;
        }

        // make sure start date is before end date
        if (startDate > endDate) {
            console.log("false");
            createEvent = false;
        }

        if (!createEvent) {
            alert("You must enter a valid start and end date!")
        }

        return (createEvent);
    }

    const handleStartDate = (newValue) => {
        setStartDate(newValue);
    }

    const handleEndDate = (newValue) => {
        setEndDate(newValue);
    }

    const handlePrioritiesChange = (newValue) => {
        setPriorities(newValue);
    }

    const handleSelectChange = (newValue) => {
        setInvitees(newValue);
    }

    const handleName = (event) => {
        setName(event)
    }

    const handleDetails = (event) => {
        setDetails(event)
    }

    const handleLocation = (location, activity) => {
        setLocation(location)
        setActivity(activity)
    }

    return (
        <div>
            <NavBar />
            <section className="App pt-8 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
                <div className="px-1">
                    <label htmlFor="title" className="text-3xl text-left block font-bold text-coolGrey-dark"> Create Event</label>
                    <label htmlFor="title" className="text-lg text-left block pb-2 text-coolGrey-dark"> Fill out the following information</label>
                </div>
            </section>
            <section className="flex flex-grow align-start items-start py-4 px-5 md:w-5/6 w-full">
                <form action="" className="flex grid grid-cols-1 flex-grow bg-white border-2 rounded px-8 py-8 pt-8">
                    <InputTextFormBlue handleCallBack={handleName} type="text" label="EVENT NAME" placeholder="example" />
                    &nbsp;&nbsp;&nbsp;
                    <InputTextFormBlue handleCallBack={handleDetails} type="text" label="EVENT DESCRIPTION" placeholder="example" />
                    &nbsp;&nbsp;&nbsp;
                    <DateSelect handleCallback={handleStartDate} label="EVENT START" />
                    &nbsp;&nbsp;&nbsp;
                    <DateSelect handleCallback={handleEndDate} label="EVENT END" />
                    &nbsp;&nbsp;&nbsp;
                    <SearchSelect handleCallback={handleSelectChange} label="SEACH AND ADD INVITEES" data = {data}/>
                    {invitees.length !== 0 && (
                        <SearchSelect handleCallback={handlePrioritiesChange} label="SET PRIORITY INVITEES" data = {invitees}/>
                    )}
                </form>
            </section>

            <div className="">
                {locationList}
            </div>

            <section className="w-full flex justify-start align-bottom items-left bg-grey-500 pb-4 px-5">
                {/* <Modal locationInfo={locationInfo} callBackLocation={callBackLocation} callBackActivity={callBackActivity} create={buildPost} testDateTimes={testDateTimes} /> */}
                
                <button
                    className="bg-coolBlue text-white active:bg-coolBlue font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => {
                        buildPost();
                    }}
                >
                    {locationList[0] === undefined ? 'Generate Location' : 'Create Event'}
                </button>
                <NavLink to="/createdEvents" className="ml-4 font-bold text-brightPink text-xl inline mt-2.5">
                    Cancel
                </NavLink>
            </section>
            {showError}
        </div>
    )
}


export default CreateEvent;