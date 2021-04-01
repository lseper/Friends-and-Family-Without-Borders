import { NavLink } from 'react-router-dom';
import Modal from '../components/model';
import Button from '../components/button';
import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import moment from "moment";
import axios from 'axios';
import NavBar from '../components/navBar'


const CreateEvent = () => {

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
        
        if(!createEvent){
            alert("You must enter a valid start and end date!")
        }
            
        return (createEvent);

    }

    useEffect(() => {
        if(data.length === 0){

        
        axios.get('/users').then(res => {
            for (let i = 0; i < res.data.length; i++){
                // console.log(localStorage['user_id']);
                if (res.data[i].id !== parseInt(localStorage['user_id'])){
                    data.push({
                        "value":res.data[i].id, 
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

    const [name, setName] = useState();
    const [details, setDetails] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [location, setLocation] = useState();
    const [activity, setActivity] = useState();
    const [data, setData] = useState([]);
    const [invitees, setInvitees] = useState([]);
    const [priorities, setPriorities] = useState([]);

    const handlePrioritiesChange = (newValue) => {
        setPriorities(newValue);
    }

    const handleSelectChange = (newValue) => {
        setInvitees(newValue);
    }

    const handleName = (event) => {
        setName(event.target.value)
    }

    const handleDetails = (event) => {
        setDetails(event.target.value)
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
                    <input onChange={name => handleName(name)} type="text" className={"text-lg focus:ring-2 focus:ring-coolBlue block pb-1 text-coolGrey-dark focus:outline-none text-left"} placeholder="example"></input>
                    <hr
                        style={{
                            color: '#98D2EB',
                            backgroundColor: '#98D2EB',
                            height: 2
                        }}
                    />
                    <label className={"text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >EVENT NAME</label>
            &nbsp;&nbsp;&nbsp;
            <input onChange={handleDetails} type="text" className={"text-lg focus:ring-2 focus:ring-coolBlue block pb-1 text-coolGrey-dark focus:outline-none text-left"} placeholder="example"></input>
                    <hr
                        style={{
                            color: '#98D2EB',
                            backgroundColor: '#98D2EB',
                            height: 2
                        }}
                    />
                    <label className={"text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >EVENT DESCRIPTION</label>
                  &nbsp;&nbsp;&nbsp;
                <div className="inline mb-1">
                        <label className="text-coolGrey-dark">
                            <FontAwesomeIcon className="inline fa-sm mr-2" icon={faCalendarDay} />
                            <DatePicker
                                className="text-lg text-coolGrey-dark focus:outline-none"
                                selected={startDate}
                                onChange={date => setStartDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                minDate={new Date()} />

                            <hr
                                style={{
                                    color: '#98D2EB',
                                    backgroundColor: '#98D2EB',
                                    height: 2
                                }}
                            />
                        </label>
                    </div>
                    <label className={"text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >EVENT START</label>
                  &nbsp;&nbsp;&nbsp;
                  <div className="inline mb-1">
                        <label className="text-coolGrey-dark">
                            <FontAwesomeIcon className="inline fa-sm mr-2 " icon={faCalendarDay} />
                            <DatePicker
                                className="text-lg text-coolGrey-dark focus:outline-none"
                                selected={endDate}
                                onChange={date => setEndDate(date)}
                                showTimeSelect
                                dateFormat="Pp"
                                minDate={new Date()} />

                            <hr
                                style={{
                                    color: '#98D2EB',
                                    backgroundColor: '#98D2EB',
                                    height: 2
                                }}
                            />
                        </label>
                    </div>
                    <label className={"text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >EVENT END</label>
            &nbsp;&nbsp;&nbsp;
                    <div className="inline mb-1">
                        <label className={"inline text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >SEARCH AND ADD INVITEES</label>
                    </div>
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
                    {invitees.length !== 0 && (
                        <span>
                            <div className="inline mb-1">
                                {/* <FontAwesomeIcon className="inline fa-sm mr-2" icon={faSearch} /> */}
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

            <section className="App min-h-0 w-full flex justify-start align-bottom items-left bg-grey-500 pb-4 px-5">
                <Modal first="Zoom" second="Indoors" third="Outdoors" callBackLocation={callBackLocation} callBackActivity={callBackActivity} create={buildPost} testDateTimes={testDateTimes} />
                <NavLink to="/createdEvents" className="ml-4 font-bold text-brightPink text-xl inline mt-2.5">
                    Cancel
                </NavLink>
            </section>

        </div>
    )
}


export default CreateEvent;