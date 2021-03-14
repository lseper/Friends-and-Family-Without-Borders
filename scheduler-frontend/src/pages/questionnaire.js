import React, { Component } from 'react';
import NavBar from '../components/navBar';
import Question from '../components/question';
import { NavLink } from 'react-router-dom';
import GreenButton from '../components/greenButton';
import axios from 'axios';

export class questionnaire extends Component {
    constructor(props) {
        super(props);
        this.state = {
          q1Answer: '',
          q2Answer: '',
          q3Answer: '',
          q4Answer: '',
          q5Answer: '',
          q6Answer: '',
          q7Answer: '',
          q8Answer: '',
          q9Answer: '',
          q10Answer: '',
          q11Answer: '',
          q12Answer: '',
          quesitonnaireId: '1'
        };
      }

    componentDidMount() {
        axios.get(`/questionnaires/1`)
        .then(res => {
            console.log(res.data[0].q1answer)
            this.setState({
                q1Answer: res.data[0].q1answer,
                q2Answer: res.data[0].q2answer,
                q3Answer: res.data[0].q3answer,
                q4Answer: res.data[0].q4answer,
                q5Answer: res.data[0].q5answer,
                q6Answer: res.data[0].q6answer,
                q7Answer: res.data[0].q7answer,
                q8Answer: res.data[0].q8answer,
                q9Answer: res.data[0].q9answer,
                q10Answer: res.data[0].q10answer,
                q11Answer: res.data[0].q11answer,
                q12Answer: res.data[0].q12answer,
            })
        }).then(() => {
            console.log(this.state.q1Answer);
        }).catch(err => {
            console.log(err);
        })

        
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