import React, { Component } from 'react';
import Button from '../components/button';



export class createEventInviteesList extends Component {

    render() {
        return (
           //<div className="flex" >
           <tr>
                <td className="text-sm text-coolGrey-dark mr-auto ml-auto">{this.props.username}</td>
                <td className="text-sm text-coolGrey-dark mr-auto ml-auto">{this.props.comfort}</td>
                <td className="text-sm text-coolGrey-dark mr-auto ml-auto">{this.props.going}</td>
            </tr>
        )
    }
}

export default createEventInviteesList