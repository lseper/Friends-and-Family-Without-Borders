import { NavLink } from 'react-router-dom';
import Button from '../components/button';
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import moment from "moment";
import axios from 'axios';


const CreateEvent = () => {

    const buildPost = (event) => {
        let eventInfo = {
            name: name,
            description: details,
            start_time: startDate,
            ending_at: endDate,
            //not implemented yet
            //invitees: invitees,
          }

          // made sure that dates and times are not equal 
          let createEvent = true;
          const startDateString = moment(startDate).format("MMMM Do YYYY hh:mm:ss");
          const endDateString = moment(endDate).format("MMMM Do YYYY hh:mm:ss")
          if (startDateString === endDateString){
              console.log("test")
              createEvent = false;
          }

          // make sure start date is before end date
          if (startDate > endDate){
              console.log("false");
              createEvent = false;
          }

          if (createEvent){
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
          } else {
            alert("Enter a valid start and end date!");
          }
    };

    const [name, setName] = useState();
    const [details, setDetails] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const data = [{
        // will map values 
        // value will be id of user 
        // label will be username 
        value: 1,
        label: "user 1"
    },
    {
        value: 2,
        label: "user 2"
    },
    {
        value: 3,
        label: "user 3"
    },
    {
        value: 4,
        label: "user 4"
    },
    {
        value: 5,
        label: "user 5"
    }];

    const [invitees, setInvitees] = useState([]);

    const handleSelectChange = (newValue) => {
        setInvitees(newValue);
    }

    const handleName = (event) => {
        setName(event.target.value)
    }
    const handleDetails = (event) => {
        setDetails(event.target.value)
    }

    return (
        <div>
            <div className="bg-coolGrey flex px-2 py-3 text-white justify-between text-2xl shadow-xl hover:shadow-md">
                <NavLink to="/createdEvents">
                    <button className="ml-5 hover:text-gray-300">←</button>
                </NavLink>
                <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
                    <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a
                            className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
                            href="#pablo"
                        >
                            CREATE EVENT
                            </a>
                    </div>
                </div>
            </div>
            <section className="App pt-8 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
                <div className="px-1 pb-1">
                    <label htmlFor="title" className="text-3xl text-left block font-bold pb-2 text-coolGrey-dark"> CREATE EVENT</label>
                </div>
                <div className="px-1">
                    <label htmlFor="title" className="text-xl text-left block font-bold pb-2 text-coolGrey-dark border-l-2 border-coolGrey"> Fill out the following information</label>
                </div>
            </section>
            <section className="flex flex-grow align-start items-start py-4 px-5 md:w-5/6 w-full">
                <form action="" className="flex grid grid-cols-1 flex-grow bg-white shadow-lg rounded px-8 py-8 pt-8">
                    <input onChange={name => handleName(name)} type="text" className={"text-sm focus:ring-2 focus:ring-coolGreen block font-bold pb-2 text-coolGrey-dark focus:outline-none text-left"} placeholder="example"></input>
                    <hr
                        style={{
                            color: "#BDE4A7",
                            backgroundColor: "#BDE4A7",
                            height: 2
                        }}
                    />
                    <label className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >EVENT NAME</label>
            &nbsp;&nbsp;&nbsp;
            <input onChange={handleDetails} type="text" className={"text-sm focus:ring-2 focus:ring-coolGreen block font-bold pb-2 text-coolGrey-dark focus:outline-none text-left"} placeholder="example"></input>
                    <hr
                        style={{
                            color: "#BDE4A7",
                            backgroundColor: "#BDE4A7",
                            height: 2
                        }}
                    />
                    <label className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >EVENT DESCRIPTION</label>
                  &nbsp;&nbsp;&nbsp;
                <div className="inline mb-1">
                <label className = "text-coolGrey-dark">
                <FontAwesomeIcon className="inline fa-sm mr-2" icon={faCalendarDay} />
                <DatePicker
                        className="font-bold text-coolGrey-dark focus:outline-none"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        minDate={new Date()} />

                    <hr
                        style={{
                            color: "#BDE4A7",
                            backgroundColor: "#BDE4A7",
                            height: 2
                        }}
                    />
                    </label> 
                    </div> 
                    <label className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >EVENT START</label>
                  &nbsp;&nbsp;&nbsp;
                  <div className="inline mb-1">
                  <label className = "text-coolGrey-dark">
                    <FontAwesomeIcon className="inline fa-sm mr-2 " icon={faCalendarDay} />
                  <DatePicker
                        className="font-bold text-coolGrey-dark focus:outline-none"
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        minDate={new Date()} />

                    <hr
                        style={{
                            color: "#BDE4A7",
                            backgroundColor: "#BDE4A7",
                            height: 2
                        }}
                    />
                    </label>
                    </div>
                    <label className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >EVENT END</label>
            &nbsp;&nbsp;&nbsp;
                </form>
            </section>
            <section className="flex flex-grow align-start items-start py-4 px-5 md:w-5/6 w-full">
                <form action="" className="flex grid grid-cols-1 flex-grow bg-white shadow-lg rounded px-8 py-8 pt-8">

                    <div className="inline mb-1">
                        <FontAwesomeIcon className="inline fa-sm mr-2" icon={faSearch} />
                        <label className={"inline text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >SEARCH AND ADD INVITEES</label>
                    </div>
                    <div className="w-full pb-4 bg-grey-100">
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
                                    primary25: '#BDE4A7',
                                    primary: '#A4969B',
                                }
                            })}
                        />
                    </div>
                </form>
            </section>
            <section className="App min-h-0 w-full flex justify-start align-bottom items-left bg-grey-500 pb-4 px-5">
                <div onClick={buildPost} className="px-1 pb-1" >
                    <Button name="Create Event" bgColor="bg-coolGreen" />
                </div>
            </section>

        </div>
    )
}


export default CreateEvent;