import React, { Component } from 'react'

export class navBar extends Component {

    render() {
        return (
            <div className="bg-coolGrey flex pt-5 pb-5 text-2xl mb-12 shadow-2xl hover:shadow-md">
                <button className="mr-auto ml-auto text-white">EVENT HOME</button>
                <button className="mr-auto ml-auto text-white">QUESTIONAIRE RESPONSE</button>
                <button className="mr-auto ml-auto text-white">PROFILE</button>
            </div>
        )
    }
}

export default navBar