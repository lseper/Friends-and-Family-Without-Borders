import React, { Component } from 'react'

import { NavLink } from 'react-router-dom';

export class homePage extends Component {
    onSubmit = () => {
        console.log("test");
        this.props.history.push('./pages/createAccount');
     }

    render() {
        return (
            <div>
                <h1>Hello</h1>
            </div>
        )
    } 
}

export default homePage