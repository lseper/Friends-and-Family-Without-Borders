import React, { Component } from 'react'

export class createdEventsButton extends Component {

    render() {
        return (
            <div>
                <div className="bg-brightPink py-4 pr-20 pl-6 rounded hover:bg-brightPink-dark hover:shadow-md text-white focus:outline-none focus:shadow-outline mt-5 shadow-xl">
                    <h2 className="text-2xl font-bold">FAMILY HANGOUT</h2>
                    <h4 className="text-xs mt-1">CLICK FOR EVENT DETAILS</h4>
                </div>
            </div>
        )
    }
}

export default createdEventsButton