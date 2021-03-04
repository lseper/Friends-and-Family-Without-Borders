import React, { Component } from 'react'
 
import { NavLink } from 'react-router-dom';

export class navigation extends Component {

    render() {
        return (
            <div>
                <NavLink to="/"></NavLink>
                <NavLink to="/createAccount"></NavLink>
            </div>
        );
    }
}

export default navigation