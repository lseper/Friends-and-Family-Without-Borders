import React, { Component } from 'react';
import ControlledAccordions from './controlledAccordions';


export class createdEventsButton extends Component {

    render() {
        return (
            <div className="flex flex-grow align-start items-start py-4 px-5 w-full md:w-3/4" >
                <div className="flex flex-wrap justify-start align-left items-left bg-white shadow-lg rounded px-8 py-2 pt-2 container bg-white w-full" >
                    <div action="" className="flex flex-grow grid grid-col-1 justify-start align-left items-left bg-white py-2 container bg-white w-full">
                        <h2 className="text-2xl font-bold text-coolGrey-dark">{this.props.name}</h2>
                        <h3 className="text-sm text-coolGrey-dark pb-2">Datails: {this.props.details}</h3>
                        <h3 className="font-bold text-coolGrey-dark">Date: {this.props.dateString}</h3>
                        <h3 className="font-bold text-coolGrey-dark pb-2">Location: {this.props.location}</h3>
                    </div>
                    <div className="py-2 w-full">
                            <ControlledAccordions />
                            
                    </div>
                </div>
            </div>
        )
    }
}

export default createdEventsButton