import React, { Component } from 'react'

export class navBar extends Component {

    render() {
        return (
            <div className="bg-coolGrey flex pt-5 pb-5 text-white text-2xl">
                <button className="mr-auto ml-auto">EVENT HOME</button>
                <button className="mr-auto ml-auto">QUESTIONAIRE RESPONSE</button>
                <button className="mr-auto ml-auto">PROFILE</button>
            </div>
        )
    }
}

export default navBar