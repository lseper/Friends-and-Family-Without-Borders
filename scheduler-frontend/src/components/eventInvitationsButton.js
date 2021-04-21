import React, { Component } from 'react'
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

export class CreatedEventsButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dateStringStart: '',
      dateStringEnd: '',
      location: '',
      organizer: '',
      attending: this.props.attending
    };
  }

  updateAttendance(status) {
    console.log(this.state.attending)
      this.setState({attending: status});

      let info =  {
        'confirmed': status
      }

      const authorization = localStorage.getItem('authToken');
      axios.put(`/users/${localStorage['user_id']}/invitations/${this.props.invitationId}`, info, {
          headers: {
              'Authorization': authorization
          }
      })
      .then(res => {
          console.log("Correctly updated attendance!")
      }).catch(err => {
          console.log("There was an error with updating attendance!")
          console.log(err.response.data);
      })
  }

  convertToPercentage = (num) => {
    return(Math.floor((num) * 100));
}

  render() {

    return (
      <div className="flex flex-grow align-start items-start  px-5 w-full md:w-3/4" >
        <div className="flex flex-wrap justify-start align-left items-left bg-white border-2 rounded px-8 py-2 pt-2 container bg-white" >
          <div action="" className="flex flex-grow grid grid-col-1 justify-start align-left items-left bg-white py-2 container bg-white">
            <div className="text-sm font-bold text-coolGrey-dark">{this.props.creator} invites you to:</div>
            <div className="flex py-2">
              <p className="text-2xl font-bold text-coolGrey-dark pt-2.5">{this.props.name}</p>
              <div className="px-5 flex">
              <div className = "flex alight-right items-right pb-2" style={{ width: 70, height: 70 }}>
                <CircularProgressbar value={this.convertToPercentage(this.props.comfort)} text={`${this.convertToPercentage(this.props.comfort)}%`}
                styles={buildStyles({     
                    // Text size
                    textSize: '24px',
                
                    // Colors
                    pathColor: '#CB4335',
                    textColor: '#CB4335',
                    trailColor: '#CD8B76',
                    backgroundColor: '#3e98c7',
                  })} />
            </div>
              </div>
            </div>

            <h3 className="text-sm text-coolGrey-dark pb-2">{this.props.details}</h3>
            <div className="flex content-center pb-4">
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
                <h3 className="font-bold text-coolGrey-dark">{this.props.dateStringStart} to {this.props.dateStringEnd}</h3>
              </div>
            </div>
            <div className="flex text-coolGrey-dark">
              <FontAwesomeIcon className="inline fa-lg mr-2 " icon={faMapMarkerAlt} />
              <div className="flex">
                <h3 className="font-bold text-coolGrey-dark pb-2">{this.props.location}</h3>
              </div>
            </div>
            <div className="flex w-full text-brightPink py-2">
              <button onClick = {() => this.updateAttendance(true)} className="focus:outline-none hover:text-brightPink-dark">
                <FontAwesomeIcon className="inline fa-2x mr-2 hover:text-brightPink-dark" icon={faCheckCircle} />
              </button>
              <div className="px-5 flex ">
                <button onClick = {() => this.updateAttendance(false)} className="focus:outline-none hover:text-brightPink-dark">
                  <FontAwesomeIcon className="inline fa-2x mr-2 hover:text-brightPink-dark" icon={faTimesCircle} />
                </button>
              </div>
              <div className="flex text-coolGrey-dark text-bold pt-1">
                  {!this.state.attending ?
                  <div>Not Going</div> :
                  <div>Going</div>
                    }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CreatedEventsButton