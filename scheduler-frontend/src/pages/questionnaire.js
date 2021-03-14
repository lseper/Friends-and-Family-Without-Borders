import React, { Component } from 'react';
import NavBar from '../components/navBar';
import Question from '../components/question';
import { NavLink } from 'react-router-dom';
import GreenButton from '../components/greenButton'

export class questionnaire extends Component {
    constructor(props){
        super(props)

        // this.state = {
            
        // }
    }

    render() {
        return (
            <div>
                {/* <p>{this.props.userId}</p> */}
               
                <NavBar />
                <section className="App py-10 px-2 w-full flex justify-start items-coolGrey bg-white">
                    <div className="px-1 pb-1">
                        <label htmlFor="title" className="text-3xl block font-bold text-left pb-2 text-coolGrey-dark">RATE YOUR COMFORT LEVEL FOR THE FOLLOWING SCENARIOS</label>
                    </div>
                </section>
                <div className = "flex grid grid-cols-1 md:grid-cols-2 flex place-items-center bg-coolGrey py-4">
                    <Question className="" question = "In-person event:"/>
                    <Question className="" question = "Indoor event:"/>
                    <Question className="" question = "Indoor event without social distancing:"/>
                    <Question className="" question = "Event with 10+ people:"/>
                    <Question className="" question = "People eating food at an event:"/>
                    <Question className="" question = "People being unmasked at an event:"/>
                    <Question className="" question = "Meeting people over Zoom:"/>
                    <Question className="" question = "Using public restrooms:"/>
                    <Question className="" question = "Eating public food:"/>
                    <Question className="" question = "Sharing physical objects:"/>
                  </div>  
                    <section className="App min-h-0 w-full flex justify-evenly align-bottom items-center bg-grey-500 py-4 px-4">
                        <div className="px-1 pb-1">
                        <NavLink to = "/homePage">
                            <GreenButton name = "Submit Questionnaire Responses"/>
                        </NavLink>
                        </div>
                    </section>
            </div>
            

        )
    } 
}

export default questionnaire