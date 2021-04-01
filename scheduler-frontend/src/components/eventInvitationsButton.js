import React, { Component } from 'react'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class createdEventsButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dateString: '',
      location: '',
      organizer: '',
    };
  }

  render() {
    let comfort;
    if (this.props.comfort === "green") {
      comfort = <div className="rounded-full h-10 w-10 flex items-left bg-coolGreen py-2 px-2"></div>;
    } else if (this.props.comfort === "yellow") {
      comfort = <div className="rounded-full h-10 w-10 flex items-left bg-yellow-500 py-2 px-2"></div>
    } else {
      comfort = <div className="rounded-full h-10 w-10 flex items-left bg-red-500 py-2 px-2"></div>
    }
    return (
      <div className="flex flex-grow align-start items-start py-4 px-5 w-full md:w-3/4" >
        <div className="flex flex-wrap justify-start align-left items-left bg-white shadow-lg rounded px-8 py-2 pt-2 container bg-white" >
          <div action="" className="flex flex-grow grid grid-col-1 justify-start align-left items-left bg-white py-2 container bg-white">
            <div className="text-sm font-bold text-coolGrey-dark">{this.props.creator} invites you to:</div>
            <div className="flex py-2">
              <p className="text-2xl font-bold text-coolGrey-dark">{this.props.name}</p>
              <div className="px-5 flex">
                {/* <h3 className="font-bold text-coolGrey-dark">{comfort}</h3> */}
              </div>
            </div>

            <h3 className="text-sm text-coolGrey-dark pb-2">{this.props.details}</h3>
            <div className="flex felx-wrap content-center pb-4">
              <hr className="text-center"
                style={{
                  color: '#CD8B76',
                  backgroundColor: '#CD8B76',
                  height: 5,
                  width: 125
                }}
              />
            </div>
            <div className="flex text-coolGrey-dark">
              <FontAwesomeIcon className="inline fa-lg mr-2 " icon={faCalendarDay} />
              <div className="flex">
                <h3 className="font-bold text-coolGrey-dark">{this.props.dateString} - {this.props.dateString}</h3>
              </div>
            </div>
            <div className="flex text-coolGrey-dark">
              <FontAwesomeIcon className="inline fa-lg mr-2 " icon={faMapMarkerAlt} />
              <div className="flex">
                <h3 className="font-bold text-coolGrey-dark pb-2">{this.props.location}</h3>
              </div>
            </div>
            {/* <div className="flex">
              <h3 className="font-bold text-coolGrey-dark">Comfort:</h3>
              <div className="px-1 pb-1 flex">
                <h3 className="font-bold text-coolGrey-dark">{comfort}</h3>
              </div>
            </div> */}
            <div className="flex w-full text-brightPink py-2">
              {/* <button className="text-md font-bold text-white border rounded bg-coolGrey py-1 px-2 focus:outline-none hover:bg-coolGrey-dark">Going</button> */}
              <button className="focus:outline-none">
                <FontAwesomeIcon className="inline fa-2x mr-2 " icon={faCheckCircle} />
              </button>
              <div className="px-5 flex">
                <button className="focus:outline-none">
                  <FontAwesomeIcon className="inline fa-2x mr-2 " icon={faTimesCircle} />
                </button>
                {/* <button className="test-md font-bold text-white border rounded bg-coolGrey py-1 px-2 focus:outline-none hover:bg-coolGrey-dark">Not Going</button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default createdEventsButton