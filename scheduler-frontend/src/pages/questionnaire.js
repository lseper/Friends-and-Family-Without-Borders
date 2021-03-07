import React, { Component } from 'react';
import NavBar from '../components/navBar';
import TopBar from '../components/topBar';
import { NavLink } from 'react-router-dom';

export class questionnaire extends Component {
    render() {
        return (
            <div>
                <TopBar />
                <NavBar />
                <div className="App h-20 w-full flex justify-center items-center bg-grey-500">
                    <div className="px-1 pb-1 py-36">
                        <label htmlFor="title" className="text-3xl block font-bold  pb-2 text-coolGrey-dark">QUESTIONNAIRE</label>
                    </div>
                </div> 
            </div>

        )
    } 
}

export default questionnaire