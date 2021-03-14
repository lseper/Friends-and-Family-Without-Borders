import React, { Component } from 'react';
import NavBar from '../components/navBar';
import Question from '../components/question';
import { NavLink } from 'react-router-dom';
import DiscreteSlider from '../components/slider';
import GreenButton from '../components/greenButton';
import axios from 'axios';

export class questionnaire extends Component {
    constructor(props){
        super(props)
        this.state = {
            q1: 4,
            q2: 4,
            q3: 4,
            q4: 4, 
            q5: 4, 
            q6: 4, 
            q7: 4, 
            q8: 4, 
            q9: 4,
            q10: 4,
            quesitonnaireId: '1'
          };

    }
    
    //get original numbers
    //set this.setState({q1: number})

    buildPost = () => {
        let questions = [this.state.q1, this.state.q2, this.state.q3, this.state.q4, this.state.q5, this.state.q6, this.state.q7, this.state.q8, this.state.q9, this.state.q10]
        console.log(questions);
    }

    handleTotalCallBack1 = (questionData) => {
        this.setState({q1: questionData})
    }

    handleTotalCallBack2 = (questionData) => {
        this.setState({q2: questionData})
    }

    handleTotalCallBack3 = (questionData) => {
        this.setState({q3: questionData})
    }

    handleTotalCallBack4 = (questionData) => {
        this.setState({q4: questionData})
    }

    handleTotalCallBack5 = (questionData) => {
        this.setState({q5: questionData})
    }

    handleTotalCallBack6 = (questionData) => {
        this.setState({q6: questionData})
    }

    handleTotalCallBack7 = (questionData) => {
        this.setState({q7: questionData})
    }

    handleTotalCallBack8 = (questionData) => {
        this.setState({q8: questionData})
    }

    handleTotalCallBack9 = (questionData) => {
        this.setState({q9: questionData})
    }

    handleTotalCallBack10 = (questionData) => {
        this.setState({q10: questionData})
    }

    componentDidMount() {
        axios.get(`/questionnaires/1`)
        .then(res => {
            console.log(res.data[0].q1answer)
            this.setState({
                q1: res.data[0].q1answer,
                q2: res.data[0].q2answer,
                q3: res.data[0].q3answer,
                q4: res.data[0].q4answer,
                q5: res.data[0].q5answer,
                q6: res.data[0].q6answer,
                q7: res.data[0].q7answer,
                q8: res.data[0].q8answer,
                q9: res.data[0].q9answer,
                q10: res.data[0].q10answer,
                q11: res.data[0].q11answer,
                q12: res.data[0].q12answer,
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
                    <Question className="" question = "In-person event:" userNumber = {4} totalCallBack = {this.handleTotalCallBack1}/>
                    <Question className="" question = "Indoor event:" userNumber = {4} totalCallBack = {this.handleTotalCallBack2}/>
                    <Question className="" question = "Indoor event without social distancing:" userNumber = {4} totalCallBack = {this.handleTotalCallBack3}/>
                    <Question className="" question = "Event with 10+ people:" userNumber = {4} totalCallBack = {this.handleTotalCallBack4}/>
                    <Question className="" question = "People eating food at an event:" userNumber = {4} totalCallBack = {this.handleTotalCallBack5}/>
                    <Question className="" question = "People being unmasked at an event:" userNumber = {4} totalCallBack = {this.handleTotalCallBack6}/>
                    <Question className="" question = "Meeting people over Zoom:" userNumber = {4} totalCallBack = {this.handleTotalCallBack7}/>
                    <Question className="" question = "Using public restrooms:" userNumber = {4} totalCallBack = {this.handleTotalCallBack8}/>
                    <Question className="" question = "Eating public food:" userNumber = {4} totalCallBack = {this.handleTotalCallBack9}/>
                    <Question className="" question = "Sharing physical objects:" userNumber = {4} totalCallBack = {this.handleTotalCallBack10}/>
                  </div>  
                    <section className="App min-h-0 w-full flex justify-evenly align-bottom items-center bg-grey-500 py-4 px-4">
                        <div className="px-1 pb-1" onClick = {this.buildPost}>
                            <GreenButton name = "Submit Questionnaire Responses"/>
                        </div>
                    </section>
            </div>
            

        )
    } 
}

export default questionnaire