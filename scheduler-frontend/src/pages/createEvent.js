import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import NavBar from '../components/navBar';
import InputTextForm from '../components/inputTextForm';
import DateSelect from '../components/dateSelect';
import SearchSelect from '../components/searchSelect';
import Button from '../components/button';
import LocationSuggestion from '../components/locationSuggestions';
import DropDown from '../components/dropDown';
import {Prompt} from 'react-router'

const SetErrors = ({ error }) => {
    return (
        <div>
            <label className="items-center font-medium tracking-wide text-red-400 text-md mt-1">{error !== undefined ? 'An error occurred: ' : ''}{error}</label>
        </div>
    )
}

const ShowLocationSuggestions = ({ value, activity, avgComfort, comfortableAttendees, comfortablePriority, totalAttendees, totalPriority }) => {
    return (
        <div>
            <LocationSuggestion
                location={value}
                activity={activity}
                comfort={avgComfort}
                comfortableAttendees={comfortableAttendees}
                comfortablePriority={comfortablePriority}
                totalAttendees={totalAttendees}
                totalPriority={totalPriority}
            />
        </div>
    )
}

const CreateEvent = () => {

    const [name, setName] = useState();
    const [details, setDetails] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState([]);
    const [data, setData] = useState([]);
    const [invitees, setInvitees] = useState([]);
    const [priorities, setPriorities] = useState([]);
    const [locationInfo, setLocationInfo] = useState([]);
    const [eventId, setEventId] = useState([]);
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);
    const [third, setThird] = useState([]);
    const [fourth, setFourth] = useState([]);
    const [fifth, setFifth] = useState([]);
    const [dropDownLocations, setDropDownLocations] = useState([]);
    const [showAddLocationButton, setShowAddLocationButton] = useState(false)
    const [locationList, setLocationList] = useState([]);
    const [error, setError] = useState();
    const [showError, setShowError] = useState([]);
    const [mask, setMask] = useState(false);
    const [noLocation, setNoLocation] = useState(true);
    const [createdEvent, setCreatedEvent] = useState(false);

    useEffect(() => {
        if (data.length === 0) {
            axios.get('/users').then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id !== parseInt(localStorage['user_id'])) {
                        data.push({
                            "value": res.data[i].id,
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
                value={location.location.location_type}
                activity={location.activity.name}
                key={location.location.location_type + '' + location.activity.name}
                id={location.id}
                avgComfort={location.average_comfort}
                comfortableAttendees={location.others_passed}
                comfortablePriority={location.priority_passed}
                totalAttendees={invitees.length}
                totalPriority={priorities.length}
            />
              )
          }
          )
        )
    }, [locationInfo]);

    useEffect(() => {
        for (let i = 0; i < locationInfo.length; i++) {
            dropDownLocations.push({
                "value": locationInfo[i].id,
                "label": locationInfo[i].location.location_type + " " + locationInfo[i].activity.name
            });
        }
    }, [locationInfo])

    useEffect(() => {
        setShowError( <SetErrors error={error} /> )
    }, [error]);

    function addInvitees(eventId) {
        // get indexes of invitees who are priority
        let priorityIndexes = [];
        for (let i = 0; i < invitees.length; i++) {
            for (let j = 0; j < priorities.length; j++) {
                if (invitees[i] === priorities[j]) {
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
                console.log(res.data.pairs);
                setLocationInfo(res.data.pairs);
                setFirst(res.data.pairs[0]);
                setSecond(res.data.pairs[1]);
                setThird(res.data.pairs[2]);
                setFourth(res.data.pairs[3]);
                setFifth(res.data.pairs[4]);
                setError(undefined);
            }).catch(err => {
                console.log("There was an error with adding invitees!")
                console.log(err.response.data);
                setError(err.response.data.name[0]);
            })

    }

    function buildPost() {
        console.log(mask)
        let eventInfo = {
            name: name,
            description: details,
            start_time: startDate,
            ending_at: endDate,
            masks_required: mask
        }
        let eventId = -1;

        const authorization = localStorage.getItem('authToken');
        axios.post(`/users/${localStorage['user_id']}/events`, eventInfo, {
            headers: {
                'Authorization': authorization
            }
        }).then(res => {
                console.log(res)
                eventId = res.data.id;
                setEventId(eventId);

                //then add invites and submit another post request 
                addInvitees(eventId);
                setError(undefined);
                setCreatedEvent(true);
            }).catch(err => {
                console.log("Something went wrong when creating an event");
                console.log(err.response.data);
                setError(err.response.data.name[0]);
            }) 
    };

    function addEventLocation() {

        //send entire suggestion-activity location
        let pair = [];
        if (location === first.id) {
            pair = first;
        }
        else if (location === second.id) {
            pair = second;
        }         
        else if (location === third.id) {
            pair = third;
        }
        else if (location === fourth.id) {
            pair = fourth;
        }else {
            pair = fifth;
        }

        const locationFinal = {
            pair: pair 
        }

        const authorization = localStorage.getItem('authToken');
        axios.put(`/events/${eventId}`, locationFinal, {
            headers: {
                'Authorization': authorization
            }
        })
            .then(res => {
                console.log("Correctly added location!")
                console.log("test");
                alert("Event has been created! View event on Created Events Page or stay to create another event")
                // setCreateEventAlert(true);
                window.location.reload();

            }).catch(err => {
                console.log("There was an error with adding an event location!")
                console.log(err.response.data);
            })
    };

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

    const handleMask = (event) => {
        if (event === 1) {
            setMask(true)
          } else {
            setMask(false)
          }
    }

    const handleDetails = (event) => {
        setDetails(event)
    }

    const callBackLocation = (event) => {
        setLocation(event)
        setNoLocation(false);
        setShowAddLocationButton(true);
    }

    return (
        <div>
        <Prompt
            when={noLocation && createdEvent}
            message={location => `You have not added a location to your event. Are you sure you want to make an event without a location?`}
          />
            <NavBar />
            <section className="App pt-8 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
                <div className="px-1">
                    <label htmlFor="title" className="text-3xl text-left block font-bold text-coolGrey-dark"> Create Event</label>
                    <label htmlFor="title" className="text-lg text-left block pb-2 text-coolGrey-dark"> Fill out the following information</label>
                </div>
            </section>
            <section className="flex flex-grow align-start items-start pt-4 px-5 md:w-5/6 w-full">
                <form action="" className="flex grid grid-cols-1 flex-grow bg-white border-2 rounded px-8 py-8 pt-8">
                    <InputTextForm focusRing = 'coolBlue' color = '#98D2EB' handleCallBack={handleName} type="text" label="EVENT NAME" placeholder="example" />
                    &nbsp;&nbsp;&nbsp;
                    <InputTextForm focusRing = 'coolBlue' color = '#98D2EB' handleCallBack={handleDetails} type="text" label="EVENT DESCRIPTION" placeholder="example" />
                    &nbsp;&nbsp;&nbsp;
                    <DateSelect handleCallback={handleStartDate} label="EVENT START" />
                    &nbsp;&nbsp;&nbsp;
                    <DateSelect handleCallback={handleEndDate} label="EVENT END" />
                    &nbsp;&nbsp;&nbsp;
                    <DropDown handleCallback={handleMask} 
                        name="MASKS REQUIRED"               
                        data = {[
                            {
                                value: 1,
                                label: "Yes"
                            },
                            {
                                value: 2,
                                label: "No"
                            }
                        ]}  
                        border="bg-coolBlue" 
                        downlable={true} 
                        primaryColor='#98D2EB'
                        initalState={false}  />
                    &nbsp;&nbsp;&nbsp;
                    <SearchSelect handleCallback={handleSelectChange} label="SEARCH AND ADD INVITEES" data={data} />
                    &nbsp;&nbsp;&nbsp;
                    <SearchSelect handleCallback={handlePrioritiesChange} label="SET REQUIRED INVITEES" data={invitees} />
                    &nbsp;&nbsp;&nbsp;
                    {locationList.length > 0 ?
                        <div>
                            {locationList}
                        &nbsp;&nbsp;&nbsp;
                        <DropDown handleCallback={callBackLocation} name="SELECT LOCATION AND ACTIVITY" data={dropDownLocations} border="bg-coolBlue" downlable={true} primaryColor='#98D2EB' />
                        </div>
                        : null
                    }
                    {showError}
                </form>
            </section>
            <div className="flex items-left justify-start rounded-b py-4">
            <section className="w-full flex justify-start align-bottom items-left bg-grey-500 pb-4 px-5">
            {showAddLocationButton ?
                    <div
                        onClick={addEventLocation}
                    >
                        <Button name="Create Event With Location" bgColor="bg-coolBlue" type="text" />
                    </div> :
                                <button
                                    className="bg-coolBlue text-white active:bg-coolBlue font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => {
                                        buildPost();
                                    }}
                                >
                                    View Suggested Locations  
                                </button> 
            }
            </section>
            
            </div>
        </div>
    )
}


export default CreateEvent;