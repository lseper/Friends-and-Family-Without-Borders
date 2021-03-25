import React, { Component } from 'react';
import Button from '../components/button';



export class createEventInviteesList extends Component {

    render() {
        return (
            <div className="flex" >
                <text className="text-sm text-coolGrey-dark mr-auto ml-auto">{this.props.username}</text>
                <text className="text-sm text-coolGrey-dark mr-auto ml-auto">{this.props.comfort}</text>
                <text className="text-sm text-coolGrey-dark mr-auto ml-auto">{this.props.going}</text>
            </div>
        )
    }
}

export default createEventInviteesList