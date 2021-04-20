import React, { Component } from 'react';
import ControlledAccordions from './controlledAccordions';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from "moment";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export class createdEventsButton extends Component {

    formatDate(dateString) {
        const starttime = moment(dateString).format("MMMM Do YYYY h:mm:ss a");
        return starttime;
    }

    formatEndDate(dateString) {
        const starttime = moment(dateString).format("h:mm:ss a");
        return starttime;
    }

    // convertToPercentage = (num) => {
    //     return(Math.floor((num) * 100));
    // }

    render() {
        return (
            <div className="flex flex-grow align-start items-start px-5 w-full md:w-3/4" >
                <div className="flex flex-wrap justify-start align-left items-left bg-white border-2 rounded px-8 py-2 pt-2 container bg-white w-full" >
                    <div action="" className="flex flex-grow grid grid-col-1 justify-start align-left items-left bg-white py-2 container bg-white w-full">
                        <div className="flex items-left justify-start rounded-b py-2">
                            <h2 className="text-2xl font-bold text-coolGrey-dark pr-2 pt-2.5">{this.props.name}</h2>
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
                        <div className="flex felx-wrap content-center pb-4">
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
                                <h3 className="text-coolGrey-dark">{this.formatDate(this.props.dateStart) + " - " + this.formatDate(this.props.dateEnd)}</h3>
                            </div>
                        </div>
                        <div className="flex text-coolGrey-dark">
                            <FontAwesomeIcon className="inline fa-lg mr-2 " icon={faMapMarkerAlt} />
                            <div className="flex">
                                <h3 className="text-coolGrey-dark pb-2">{this.props.location}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="py-2 w-full">
                        <ControlledAccordions numComfort={this.props.numComfort} invitees={this.props.invitees} />

                    </div>
                </div>
            </div>
        )
    }
}

export default createdEventsButton;