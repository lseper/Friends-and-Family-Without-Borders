import React, { Component } from 'react'

export class topBar extends Component {

    render() {
        return (
            <div className = "bg-coolGrey flex pt-5 pb-5 text-white text-lg">
                <p className="mr-auto ml-auto"> Friends and Family with Borders </p>
                <p className="ml-auto mr-auto"> User Icon </p>
            </div>
        )
    }
}

export default topBar