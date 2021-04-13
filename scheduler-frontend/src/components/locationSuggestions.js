import React, { Component } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export class LocationSuggestion extends Component {

convertToPercentage = (num) => {
    console.log(Math.floor((num) * 100))
    return(Math.floor((num) * 100));
}

  render() {

    return (
      <div className="flex flex-grow grid grid-cols-1 justify-start bg-white rounded py-2 pt-2 container bg-white w-full" >
        <form action="" className="flex flex-grow grid grid-cols-1 justify-start align-left items-left bg-white border-2 border-bg-gray-200 rounded py-1 pt-2 container bg-white">
        <div>
        <div className="flex items-left justify-start rounded-b py-2">
            <div className = "flex alight-right items-right pb-2" style={{ width: 50, height: 50 }}>
                <CircularProgressbar value={this.convertToPercentage(this.props.comfort)} text={`${this.convertToPercentage(this.props.comfort)}%`}
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
            <label htmlFor="title" className="text-left text-md block text-coolGrey-dark pt-4 pl-2">{this.props.location} - {this.props.activity}</label>

            {/* <label className="text-left text-sm block text-coolGrey-dark px-4">{this.convertToPercentage(this.props.comfort)}% </label> */}
          </div>  
          {/* <div className="flex content-center pb-2">
              <hr className="text-center"
                style={{
                  color: '#98D2EB',
                  backgroundColor: '#98D2EB',
                  height: 5,
                  width: 125
                }}
              />
            </div> */}
            <label className="text-left text-xs block text-coolGrey-dark px-2">{this.props.comfortableAttendees}/{this.props.totalAttendees} Comfortable Attendee </label>
            <label className="text-left text-xs block text-coolGrey-dark px-2 pb-2">{this.props.comfortablePriority}/{this.props.totalPriority} Comfortable Priority Attendees </label>
            </div>


        </form>

      </div>
      
    )
  }
}

export default LocationSuggestion;