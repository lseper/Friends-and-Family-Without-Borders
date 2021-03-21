import React, { Component } from 'react'

export class createdEventsButton extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dateString: '',
      location: '',
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
            <h2 className="text-2xl font-bold text-coolGrey-dark">{this.props.name}</h2>
            <h3 className="text-sm text-coolGrey-dark pb-2">Datails: {this.props.details}</h3>
            <h3 className="font-bold text-coolGrey-dark">Date: {this.props.dateString}</h3>
            <h3 className="font-bold text-coolGrey-dark pb-2">Location: {this.props.location}</h3>
            <div className="flex">
              <h3 className="font-bold text-coolGrey-dark">Comfort:</h3>
              <div className="px-1 pb-1 flex">
                <h3 className="font-bold text-coolGrey-dark">{comfort}</h3>
              </div>
            </div>
            <div className="flex py-2">
              <button className="text-md font-bold text-white border rounded bg-coolGrey py-1 px-2 focus:outline-none hover:bg-coolGrey-dark">Going</button>
              <div className="px-5 flex">
                <button className="test-md font-bold text-white border rounded bg-coolGrey py-1 px-2 focus:outline-none hover:bg-coolGrey-dark">Not Going</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default createdEventsButton