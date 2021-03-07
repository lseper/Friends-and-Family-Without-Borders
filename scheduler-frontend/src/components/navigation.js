import React, { Component } from 'react'
 
import { NavLink } from 'react-router-dom';

export class navigation extends Component {

    render() {
        return (
            <div>
                <NavLink to="/"></NavLink>
                <NavLink to="/createAccount"></NavLink>
                <NavLink to="/homePage"></NavLink>
                <NavLink to="/createEvent"></NavLink>
                <NavLink to="/questionnaire"></NavLink>
                <NavLink to="/profile"></NavLink>
            </div>
        );
    }
}

export default navigation