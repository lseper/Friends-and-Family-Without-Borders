import { NavLink } from 'react-router-dom';
import Modal from '../components/model';
import React, { useState, useEffect } from 'react';
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select';
import moment from "moment";
import axios from 'axios';
import NavBar from '../components/navBar';
import InputTextFormBlue from '../components/inputTextFormBlue';
import DateSelect from '../components/dateSelect';



const CreateEvent = () => {

    const [name, setName] = useState();
    const [details, setDetails] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState();
    const [activity, setActivity] = useState();
    const [data, setData] = useState([]);
    const [invitees, setInvitees] = useState([]);
    const [priorities, setPriorities] = useState([]);

    useEffect(() => {
        if (data.length === 0) {


            axios.get('/users').then(res => {
                for (let i = 0; i < res.data.length; i++) {
                    // console.log(localStorage['user_id']);
                    if (res.data[i].id !== parseInt(localStorage['user_id'])) {
                        data.push({
                            "value": res.data[i].id,
                            "label": res.data[i].username
                        });
                    }
                }
            }).catch(err => {
                console.log(err.response.data.message);
            })
        }
    });

    const buildPost = (event) => {
        let eventInfo = {
            name: name,
            description: details,
            start_time: startDate,
            ending_at: endDate,
            //not implemented yet
            //invitees: invitees,
            //location: location,
            //activity: activity
        }

        const authorization = localStorage.getItem('authToken');
        axios.post(`/users/${localStorage['user_id']}/events`, eventInfo, {
            headers: {
                'Authorization': authorization
            }
        })
            .then(res => {
                console.log(res);
                window.location.reload();
            }).catch(err => {
                console.log("Something went wrong when creating an event");
                console.log(err.response.data)
            })

    };

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

    const callBackLocation = (event) => {
        setLocation(event.target.value)
        console.log(event.target.value)
    }

    const callBackActivity = (event) => {
        setActivity(event.target.value)
        console.log(event.target.value)
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
                    <div className="w-full bg-grey-100">
                        <Select
                            isMulti
                            name="colors"
                            options={data}
                            onChange={(newValue) => handleSelectChange(newValue)}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            theme={theme => ({
                                ...theme,
                                borderRadius: 0,
                                colors: {
                                    ...theme.colors,
                                    primary25: '#98D2EB',
                                    primary: '#A4969B',
                                }
                            })}
                        />
                    </div>
                    <label className={"inline text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >SEARCH AND ADD INVITEES</label>

                    {invitees.length !== 0 && (
                        <span>
                            <div className="inline mb-1">
                                <label className={"inline text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >SET PRIORITY INVITEES</label>
                            </div>
                            <div className="w-full pb-4 bg-grey-100">
                                <Select
                                    isMulti
                                    name="colors"
                                    options={invitees}
                                    onChange={(newValue) => handlePrioritiesChange(newValue)}
                                    className="basic-multi-select"
                                    classNamePrefix="select"
                                    theme={theme => ({
                                        ...theme,
                                        borderRadius: 0,
                                        colors: {
                                            ...theme.colors,
                                            primary25: '#BDE4A7',
                                            primary: '#A4969B',
                                        }
                                    })}
                                />
                            </div>
                        </span>
                    )}
                </form>
            </section>

            <section className="w-full flex justify-start align-bottom items-left bg-grey-500 pb-4 px-5">
                <Modal first="Zoom" second="Indoors" third="Outdoors" callBackLocation={callBackLocation} callBackActivity={callBackActivity} create={buildPost} testDateTimes={testDateTimes} />
                <NavLink to="/createdEvents" className="ml-4 font-bold text-brightPink text-xl inline mt-2.5">
                    Cancel
                </NavLink>
            </section>

        </div>
    )
}


export default CreateEvent;