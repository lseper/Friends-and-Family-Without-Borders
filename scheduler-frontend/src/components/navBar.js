import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";

export class navBar extends Component {

    render() {
        return (
            <section className="bg-coolGrey flex pt-5 pb-5 text-white  shadow-2xl text-2xl mb-12">
                <div className="mr-auto ml-auto text-white">
                    <NavLink to = "/" >
                    <button>EVENT HOME</button>
                    </NavLink>
                </div>
                <div className="mr-auto ml-auto text-white">
                    <NavLink to = "/questionnaire">
                    <button >QUESTIONAIRE RESPONSE</button>
                    </NavLink>
                </div>
                <div className="mr-auto ml-auto text-white">
                    <NavLink to = "/profile">
                    <button>PROFILE</button>
                    </NavLink>
                </div>
            </section>
        )
    }
}

export default withRouter(navBar)
///Users/emilykraai/Documents/GitHub/team-project-repository-emily-parker-michael-liam-nicole/scheduler-frontend/src/pages/questionnaire.js
//export const LeftSideBar = withRouter((props) => {