import React, { Component } from 'react';
import NavBar from '../components/navBar';
import Question from '../components/question';
import GreenButton from '../components/greenButton';
import axios from 'axios';

export class questionnaire extends Component {
    constructor(props){
        super(props)
        this.state = {
            q1: 0,
            q2: 0,
            q3: 0,
            q4: 0, 
            q5: 0, 
            q6: 0, 
            q7: 0, 
            q8: 0, 
            q9: 0,
            q10: 0,
            quesitonnaireId: '1'
          };

    }

    buildPost = () => {
        let questions = [this.state.q1, this.state.q2, this.state.q3, this.state.q4, this.state.q5, this.state.q6, this.state.q7, this.state.q8, this.state.q9, this.state.q10]
        console.log(questions);
        localStorage.setItem('filledOutQuestionnaire', true);

         // possible way to send a post request?
        // axios.post('/questionnaires/1')
        // .then(response => this.setState({ q1answer: this.state.ql,
        //                                   q2answer: this.state.q2,
        //                                   q3answer: this.state.q3,
        //                                   q4answer: this.state.q4,
        //                                   q5answer: this.state.q5, 
        //                                   q6answer: this.state.q6,
        //                                   q7answer: this.state.q7,
        //                                   q8answer: this.state.q8,
        //                                   q9answer: this.state.q9,
        //                                   q10answer: this.state.q10,
        //                                 }));

    }

    handleTotalCallBack = (questionData, questionNum) => {
        switch(questionNum) {
            case 1:
              this.setState({q1: questionData})
              break;
            case 2:
              this.setState({q2: questionData})
              break;
            case 3:
              this.setState({q3: questionData})
              break;
            case 4:
              this.setState({q4: questionData})
              break;
            case 5:
              this.setState({q5: questionData})
              break;
            case 6:
              this.setState({q6: questionData})
              break;
            case 7:
              this.setState({q7: questionData})
              break;
            case 8:
              this.setState({q8: questionData})
              break;
            case 9:
              this.setState({q9: questionData})
              break;
            case 10:
              this.setState({q10: questionData})
              break;
            default:
              // code block
          }
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

        console.log(localStorage.getItem("user_id"));
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
                  <Question className="" question = "In-person event:" userNumber = {this.state.q1} totalCallBack = {this.handleTotalCallBack1}/>
                    <Question className="" question = "Indoor event:" userNumber = {this.state.q2} totalCallBack = {this.handleTotalCallBack2}/>
                    <Question className="" question = "Indoor event without social distancing:" userNumber = {this.state.q3} totalCallBack = {this.handleTotalCallBack3}/>
                    <Question className="" question = "Event with 10+ people:" userNumber = {this.state.q4} totalCallBack = {this.handleTotalCallBack4}/>
                    <Question className="" question = "People eating food at an event:" userNumber = {this.state.q5} totalCallBack = {this.handleTotalCallBack5}/>
                    <Question className="" question = "People being unmasked at an event:" userNumber = {this.state.q6} totalCallBack = {this.handleTotalCallBack6}/>
                    <Question className="" question = "Meeting people over Zoom:" userNumber = {this.state.q7} totalCallBack = {this.handleTotalCallBack7}/>
                    <Question className="" question = "Using public restrooms:" userNumber = {this.state.q8} totalCallBack = {this.handleTotalCallBack8}/>
                    <Question className="" question = "Eating public food:" userNumber = {this.state.q9} totalCallBack = {this.handleTotalCallBack9}/>
                    <Question className="" question = "Sharing physical objects:" userNumber = {this.state.q10} totalCallBack = {this.handleTotalCallBack10}/>
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