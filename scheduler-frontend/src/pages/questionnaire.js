import React, { Component } from 'react';
import NavBar from '../components/navBar';
import Question from '../components/question';
import Button from '../components/button';
import Loading from '../components/loading';
import axios from 'axios';

export class Questionnaire extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
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
      q11: 0,
      q12: 0,
      quesitonnaireId: '1'
    };
  }

  componentDidMount() {
    
    // if a user is not logged in, brings them to the login page
    if (!localStorage['user_id'] && !localStorage['authToken']) {
      this.props.history.push('/');
      localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
    }

    const token = localStorage.getItem("authToken").toString();
    console.log("User token on questionnaire page: ", token);
    axios.defaults.headers.common['Authorization'] = token;

    console.log("User id on questionnaire page: ", localStorage['user_id']);
    axios.get(`/users/${localStorage['user_id']}/questionnaires`)
      .then(res => {
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
          loading: false
        })
      }).then(() => {
        console.log(this.state);
      }).catch(err => {
        console.log(err);
        this.setState({ loading: false })
      })
  }

  buildPost = () => {

    let questionnaireInfo = {
      q1answer: this.state.q1,
      q2answer: this.state.q2,
      q3answer: this.state.q3,
      q4answer: this.state.q4,
      q5answer: this.state.q5,
      q6answer: this.state.q6,
      q7answer: this.state.q7,
      q8answer: this.state.q8,
      q9answer: this.state.q9,
      q10answer: this.state.q10,
      q11answer: this.state.q11,
      q12answer: this.state.q12,
      user_id: localStorage['user_id']
    }

    axios.post(`/users/${localStorage['user_id']}/questionnaires`, questionnaireInfo)
      .then(res => {
        localStorage.setItem('filledOutQuestionnaire', true);
        console.log(res);
      }).catch(err => {
        console.log("Something went wrong when making questionnaire");
        console.log(err.response.data)
      })
  }

  handleTotalCallBack = (questionData, questionNum) => {
    switch (questionNum) {
      case 1:
        this.setState({ q1: questionData })
        break;
      case 2:
        this.setState({ q2: questionData })
        break;
      case 3:
        this.setState({ q3: questionData })
        break;
      case 4:
        this.setState({ q4: questionData })
        break;
      case 5:
        this.setState({ q5: questionData })
        break;
      case 6:
        this.setState({ q6: questionData })
        break;
      case 7:
        this.setState({ q7: questionData })
        break;
      case 8:
        this.setState({ q8: questionData })
        break;
      case 9:
        this.setState({ q9: questionData })
        break;
      case 10:
        this.setState({ q10: questionData })
        break;
      case 11:
        this.setState({ q11: questionData })
        break;
      case 12:
        this.setState({ q12: questionData })
        break;
      default:
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        {this.state.loading ?
          <Loading /> :
          null
        }

        <div className="px-6 mt-3 py-5 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
            <label htmlFor="title" className="text-3xl text-left block font-bold text-coolGrey-dark"> Questionnaire</label>
            <label htmlFor="title" className="text-lg text-left block text-coolGrey-dark mb-4">Rate your comfort for the following scenarios (10 is most comfortable)</label>
        </div>
        <div className="flex grid grid-cols-1 md:grid-cols-1 flex-grow py-1">
          <Question className="" question="Indoor in-person event with relatives:" userNumber={this.state.q1} qNum={1} totalCallBack={this.handleTotalCallBack} />
          <Question className="" question="Indoor in-person event with friends:" userNumber={this.state.q2} qNum={2} totalCallBack={this.handleTotalCallBack} />
          <Question className="" question="Indoor event without social distancing:" userNumber={this.state.q3} qNum={3} totalCallBack={this.handleTotalCallBack} />
          <Question className="" question="Indoor event with 10+ people:" userNumber={this.state.q4} qNum={4} totalCallBack={this.handleTotalCallBack} />
          <Question className="" question="Indoor event with 30+ people:" userNumber={this.state.q5} qNum={5} totalCallBack={this.handleTotalCallBack} />
          <Question className="" question="People being unmasked at an event:" userNumber={this.state.q6} qNum={6} totalCallBack={this.handleTotalCallBack} />
          <Question className="" question="People eating food at an event:" userNumber={this.state.q7} qNum={7} totalCallBack={this.handleTotalCallBack} />
          <Question className="" question="Using public restrooms:" userNumber={this.state.q8} qNum={8} totalCallBack={this.handleTotalCallBack} />
          <Question className="" question="Eating public food:" userNumber={this.state.q9} qNum={9} totalCallBack={this.handleTotalCallBack} />
          <Question className="" question="Sharing physical objects:" userNumber={this.state.q10} qNum={10} totalCallBack={this.handleTotalCallBack} />
          <Question className="" question="Event without handsanitizer available:" userNumber={this.state.q11} qNum={11} totalCallBack={this.handleTotalCallBack} />
          <Question className="" question="Attending event where invitee has been exposed:" userNumber={this.state.q12} qNum={12} totalCallBack={this.handleTotalCallBack} />
        </div>

        <section className="">
          <div className="px-5 pb-2" onClick={this.buildPost}>
            <Button name="Submit Questionnaire Responses" bgColor="bg-coolGreen" />
          </div>
        </section>
      </div>
    )
  }
}

export default Questionnaire;