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
import { Prompt } from 'react-router'
import Loading from '../components/loading'

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

    //basic event infomration 
    const [name, setName] = useState();
    const [details, setDetails] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [mask, setMask] = useState(false);
    const [eventId, setEventId] = useState([]);

    //event invitees
    const [allUsers] = useState([]);
    const [invitees, setInvitees] = useState([]);
    const [priorities, setPriorities] = useState([]);

    // set location options 
    const [first, setFirst] = useState([]);
    const [second, setSecond] = useState([]);
    const [third, setThird] = useState([]);
    const [fourth, setFourth] = useState([]);
    const [fifth, setFifth] = useState([]);

    // used for location suggestions
    const [location, setLocation] = useState([]);
    const [locationInfo, setLocationInfo] = useState([]);
    const [dropDownLocations] = useState([]);
    const [showAddLocationButton, setShowAddLocationButton] = useState(false)
    const [locationList, setLocationList] = useState([]);

    // used to encourage the user to set a location before leaving the page 
    const [noLocation, setNoLocation] = useState(true);
    const [createdEvent, setCreatedEvent] = useState(false);

    // for error messages
    const [error, setError] = useState();
    const [showError, setShowError] = useState([]);

    // for loading
    const [loading, setLoading] = useState(false);

    // 
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        if (allUsers.length === 0) {
            axios.get('/users').then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    if (res.data[i].id !== parseInt(localStorage['user_id'])) {
                        allUsers.push({
                            "value": res.data[i].id,
                            "label": res.data[i].username
                        });
                    }
                }
            }).catch(err => {
                console.log(err.response.data);
            })
        }
    }, [allUsers]);

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
    }, [locationInfo, invitees, priorities]);

    useEffect(() => {
        for (let i = 0; i < locationInfo.length; i++) {
            dropDownLocations.push({
                "value": locationInfo[i].id,
                "label": locationInfo[i].location.location_type + " " + locationInfo[i].activity.name
            });
        }
    }, [locationInfo, dropDownLocations])

    useEffect(() => {
        setShowError(<SetErrors error={error} />)
    }, [error]);

    function buildPost() {
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
            eventId = res.data.id;
            setEventId(eventId);
            addInvitees(eventId);
            setError(undefined);
            setCreatedEvent(true);
        }).catch(err => {
            console.log("Something went wrong when creating an event");
            console.log(err.response.data);
            setError(err.response.data.name[0]);
        })
    };

    function getInviteesList() {
        // get indexes of invitees who are priority
        let priorityIndexes = [];
        for (let i = 0; i < invitees.length; i++) {
            for (let j = 0; j < priorities.length; j++) {
                if (invitees[i] === priorities[j]) {
                    priorityIndexes.push(i);
                }
            }
        }

        //create list of final invitees and add if they are priority or not
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
        return (finalInviteesList)
    }

    function addInvitees(eventId) {

        let finalInvitees = ({
            user_id: localStorage.getItem('user_id'),
            event_id: eventId,
            invitees: getInviteesList()
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
                setFirst(res.data.pairs[0]);
                setSecond(res.data.pairs[1]);
                setThird(res.data.pairs[2]);
                setFourth(res.data.pairs[3]);
                setFifth(res.data.pairs[4]);
                setError(undefined);
                setIsDisabled(true);
            }).catch(err => {
                console.log("There was an error with adding invitees!")
                console.log(err.response.data);
                setError(err.response.data.name[0]);
            })
    }

    function addEventLocation() {
        setLoading(true)
        const locationFinal = {
            pair: determineLocation()
        }

        const authorization = localStorage.getItem('authToken');
        axios.put(`/events/${eventId}`, locationFinal, {
            headers: {
                'Authorization': authorization
            }
        })
            .then(res => {
                console.log("Correctly added location!")
                setNoLocation(false);
                setLoading(false);
                window.location.reload();

            }).catch(err => {
                console.log("There was an error with adding an event location!")
                console.log(err.response.data);
            })
    };

    function determineLocation() {
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
        } else {
            pair = fifth;
        }
        return (pair)
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
        setShowAddLocationButton(true);
    }

    return (
        <div>
            {loading ?
                    <Loading /> :
                    null
            }
            <Prompt
                when={noLocation && createdEvent}
                message={location => `You have not added a location to your event. Are you sure you want to make an event without a location?`}
            />
            <NavBar />
            <section className="App pt-8 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
                <div className="px-1">
                    <label htmlFor="title" className="text-3xl text-left block font-bold text-coolGrey-dark"> Create Event</label>
                    <label htmlFor="title" className="text-lg text-left block pb-2 text-coolGrey-dark"> Fill out the following information (100% is most comfortable)</label>
                </div>
            </section>
            <section className="flex flex-grow align-start items-start pt-4 px-5 md:w-5/6 w-full">
                <form action="" className="flex grid grid-cols-1 flex-grow bg-white border-2 rounded px-8 py-8 pt-8">
                    <InputTextForm focusRing='coolBlue' color='#98D2EB' handleCallBack={handleName} type="text" label="EVENT NAME" placeholder="example" isDisabled={isDisabled} />
                    &nbsp;&nbsp;&nbsp;
                    <InputTextForm focusRing='coolBlue' color='#98D2EB' handleCallBack={handleDetails} type="text" label="EVENT DESCRIPTION" placeholder="example" isDisabled={isDisabled} />
                    &nbsp;&nbsp;&nbsp;
                    <DateSelect isDisabled={isDisabled} handleCallback={handleStartDate} label="EVENT START" />
                    &nbsp;&nbsp;&nbsp;
                    <DateSelect isDisabled={isDisabled} handleCallback={handleEndDate} label="EVENT END" />
                    &nbsp;&nbsp;&nbsp;
                    <DropDown handleCallback={handleMask}
                        name="MASKS REQUIRED"
                        data={[
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
                        initalState={false} 
                        isDisabled = {isDisabled}/>
                    &nbsp;&nbsp;&nbsp;
                    <SearchSelect handleCallback={handleSelectChange} label="SEARCH AND ADD INVITEES" data={allUsers} isDisabled = {isDisabled} />
                    &nbsp;&nbsp;&nbsp;
                    <SearchSelect handleCallback={handlePrioritiesChange} label="SET REQUIRED INVITEES" data={invitees} isDisabled = {isDisabled}  />
                    &nbsp;&nbsp;&nbsp;
                    {locationList.length > 0 ?
                        <div>
                            <div>
                            {locationList}
                            </div>
                        &nbsp;&nbsp;&nbsp;
                        <div className = "pt-2">
                            <DropDown handleCallback={callBackLocation} name="SELECT LOCATION AND ACTIVITY" data={dropDownLocations} border="bg-coolBlue" downlable={true} primaryColor='#98D2EB' />
                        </div>
                        </div>
                        : null
                    }
                    {showError}
                </form>
            </section>
            <div className="flex items-left justify-start rounded-b py-4">
                <section className="w-full flex justify-start align-bottom items-left bg-grey-500 pb-4 px-5">
                    {showAddLocationButton ?
                        <div onClick={addEventLocation}>
                            <Button name="Create Event With Location" bgColor="bg-coolBlue" type="text" />
                        </div> :
                        <button
                            className="bg-coolBlue text-white active:bg-coolBlue font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {
                                buildPost();
                            }}>
                            View Suggested Locations
                        </button>
                    }
                </section>

            </div>
        </div>
    )
}


export default CreateEvent;