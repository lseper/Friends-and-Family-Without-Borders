import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";

export class navBar extends Component {

    render() {
        return (
            <div className="bg-coolGrey flex pt-5 pb-5 text-white  shadow-2xl text-2xl mb-12">
                <NavLink to = "/homePage">
                    <button className="mr-auto ml-auto text-white">EVENT HOME</button>
                </NavLink>
                <button className="mr-auto ml-auto text-white">QUESTIONAIRE RESPONSE</button>
                <button className="mr-auto ml-auto text-white">PROFILE</button>
            </div>
        )
    }
}

export default withRouter(navBar)

//export const LeftSideBar = withRouter((props) => {