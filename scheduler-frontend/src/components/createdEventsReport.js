import React, { Component } from 'react';
import ControlledAccordion from './controlledAccordion';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeadSideMask } from '@fortawesome/free-solid-svg-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios';
import { Prompt } from 'react-router'

export class CreatedEventsReport extends Component {

    constructor(props) {
        super(props);
        this.state = {
            eventId: this.props.eventId,
            confirmDelete: false
        };
    }

    getDate = (start, end) => {
        // if one the same date, don't print date twice
        const startIndex = start.indexOf(":");
        const endIndex = end.indexOf(":");
        const firstStart = start.slice(0, startIndex - 1)
        const endStart = end.slice(0, endIndex - 1)

        if (firstStart == endStart) {
            const endPrint = end.slice(endIndex - 1)
            return (start + " until " + endPrint)
        }
        else {
            return (start + " until " + end)
        }
    }

    getMaskRequirements = (status) => {
        if (status) {
            return "Masks Required";
        } else {
            return "Masks are NOT Required"
        }
    }

    deleteEvent(id) {
        console.log(id);

        const authorization = localStorage.getItem('authToken');
        axios.delete(`/events/${id}`, {
            headers: {
                'Authorization': authorization
            }
        })
            .then(res => {
                window.location.reload();
            }).catch(err => {
                console.log("There was an error with updating attendance!")
                console.log(err.response.data);
            })
    }

    render() {
        return (
            <div className="flex flex-grow align-start items-start px-5 w-full md:w-3/4" >

                <div className="flex flex-wrap bg-white border-2 rounded px-8 py-2 pt-2 container bg-white w-full" >
                    <div className="ml-auto">
                    </div>
                    <button onClick={() => {
                        window.confirm("Are you sure you want to delete this event? This action is permanent.")
                        this.deleteEvent(this.props.eventId)
                    }} className="flex text-right justify-end items-stretch text-coolGrey-dark">
                        <FontAwesomeIcon className="flex text-right justify-end inline fa-2x " icon={faMinus} />
                    </button>
                    <div action="" className="flex flex-grow grid grid-col-1 justify-start align-left items-left bg-white container bg-white w-full">
                        <div className="flex items-left justify-start rounded-b pb-2">
                            <h2 className="text-2xl font-bold text-coolGrey-dark pr-2 pt-2">{this.props.name}</h2>
                            <div className="flex alight-right items-right pb-2" style={{ width: 70, height: 70 }}>
                                <CircularProgressbar value={this.props.comfort} text={`${this.props.comfort}%`}
                                    styles={buildStyles({
                                        // Text size
                                        textSize: '24px',

                                        // Colors
                                        pathColor: '#5DADE2',
                                        textColor: '#5DADE2',
                                        trailColor: '#98D2EB',
                                        backgroundColor: '#3e98c7',
                                    })} />
                            </div>
                        </div>
                        <h3 className="text-sm text-coolGrey-dark pb-2">{this.props.details}</h3>
                        <div className="flex content-center pb-4">
                            <hr className="text-center"
                                style={{
                                    color: '#98D2EB',
                                    backgroundColor: '#98D2EB',
                                    height: 5,
                                    width: 125
                                }}
                            />
                        </div>
                        <div className="flex text-coolGrey-dark pt-2">
                            <FontAwesomeIcon className="inline fa-lg mr-2 " icon={faCalendarDay} />
                            <div className="flex">
                                <h3 className="text-coolGrey-dark">{this.getDate(this.props.dateStart, this.props.dateEnd)}</h3>
                            </div>
                        </div>
                        <div className="flex text-coolGrey-dark">
                            <FontAwesomeIcon className="inline fa-lg mr-2 " icon={faMapMarkerAlt} />
                            <div className="flex">
                                <h3 className="pl-1 text-coolGrey-dark">{this.props.location} - {this.props.activity}</h3>
                            </div>
                        </div>
                        <div className="flex text-coolGrey-dark">
                            <FontAwesomeIcon className="inline fa-lg mr-2 " icon={faHeadSideMask} />
                            <div className="flex">
                                <h3 className="text-coolGrey-dark pb-2">{this.getMaskRequirements(this.props.maskRequired)}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="pt-2 pb-4 w-full">
                        <ControlledAccordion numComfort={this.props.numComfort} invitees={this.props.invitees} />
                    </div>
                </div>
            </div>
        )
    }
}

export default CreatedEventsReport;