import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";

export class navBar extends Component {

    render() {
        return (
            <div className="bg-coolGrey flex pt-5 pb-5 text-white text-2xl mb-12">
                <NavLink to = "/homePage">
                    <button className="mr-auto ml-auto">EVENT HOME</button>
                </NavLink>
                <button className="mr-auto ml-auto">QUESTIONAIRE RESPONSE</button>
                <button className="mr-auto ml-auto">PROFILE</button>
            </div>
        )
    }
}

export default withRouter(navBar)

//export const LeftSideBar = withRouter((props) => {