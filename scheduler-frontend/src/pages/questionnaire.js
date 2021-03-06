import React, { Component } from 'react';
import NavBar from '../components/navBar';
import Question from '../components/question';
import Button from '../components/button';
import Loading from '../components/loading';
import axios from 'axios';
import Alert from '../components/alert';
import { NavLink } from 'react-router-dom';

export class Questionnaire extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
      q1: 1,
      q2: 1,
      q3: 1,
      q4: 1,
      q5: 1,
      q6: 1,
      q7: 1,
      q8: 1,
      quesitonnaireId: '1'
    };
  }

  componentDidMount = () => {

    // if a user is not logged in, brings them to the login page
    if (!localStorage['user_id'] && !localStorage['authToken']) {
      this.props.history.push('/');
      localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
    }

    const token = localStorage.getItem("authToken").toString();
    axios.defaults.headers.common['Authorization'] = token;
    const needPopup = (localStorage.getItem('filledOutQuestionnaire') === "false");
    if (needPopup) {
      this.setState({ showPopup: true })
    }
    else {
      this.setState({ showPopup: false })
    }

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
      user_id: localStorage['user_id']
    }

    axios.post(`/users/${localStorage['user_id']}/questionnaires`, questionnaireInfo)
      .then(res => {
        localStorage.setItem('filledOutQuestionnaire', true);
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
      default:
    }
  }

  render() {

    const marks10 = [
      {
        value: 2,
        label: 2,
      },
      {
        value: 4,
        label: 4,
      },
      {
        value: 6,
        label: 6,
      },
      {
        value: 8,
        label: 8,
      },
      {
        value: 10,
        label: 10,
      },
    ];

    const marks50 = [
      {
        value: 5,
        label: 5,
      },
      {
        value: 10,
        label: 10,
      },
      {
        value: 15,
        label: 15,
      },
      {
        value: 20,
        label: 20,
      },
      {
        value: 25,
        label: 25,
      },
      {
        value: 30,
        label: 30,
      },
    ];

    return (
      <div>
        <NavBar />
        {this.state.loading ?
          <Loading /> :
          null
        }
        {this.state.showPopup ?
          <div>
            <Alert color="coolGreen" message="Please first fill out a questionnaire!" />
          </div>
          : null
        }

        <div className="px-6 mt-3 py-5 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
          <label htmlFor="title" className="text-3xl text-left block font-bold text-coolGrey-dark"> Questionnaire</label>
          <label htmlFor="title" className="text-lg text-left block text-coolGrey-dark mb-4">Rate your comfort for the following scenarios (10 is most comfortable)</label>
          <NavLink to="/pastQuestionnaires">
            <button className=" bg-coolGreen py-1 px-5 text-left rounded hover:bg-coolGreen-dark hover:shadow-md font-bold text-white focus:outline-none focus:shadow-outline shadow-xl "> PAST QUESTIONNAIRES</button>
          </NavLink>
        </div>
        <div className="flex grid grid-cols-1 md:grid-cols-1 flex-grow py-1">
          <Question className="" question="How comfortable are you with events hosted outside?" userNumber={this.state.q1} qNum={1} totalCallBack={this.handleTotalCallBack} maxPeople={10} marks={marks10} />
          <Question className="" question="How comfortable are you with events hosted inside, with room for social distancing?" userNumber={this.state.q2} qNum={2} totalCallBack={this.handleTotalCallBack} maxPeople={10} marks={marks10} />
          <Question className="" question="How comfortable are you with events hosted inside, not large enough for social distancing?" userNumber={this.state.q3} qNum={3} totalCallBack={this.handleTotalCallBack} maxPeople={10} marks={marks10} />
          <Question className="" question="How comfortable are you with online events?" userNumber={this.state.q4} qNum={4} totalCallBack={this.handleTotalCallBack} maxPeople={10} marks={marks10} />
          <Question className="" question="How comfortable are you with eating or drinking around people?" userNumber={this.state.q5} qNum={5} totalCallBack={this.handleTotalCallBack} maxPeople={10} marks={marks10} />
          <Question className="" question="How important is social distancing to you?" userNumber={this.state.q6} qNum={6} totalCallBack={this.handleTotalCallBack} maxPeople={10} marks={marks10} />
          <Question className="" question="How important is it that people are wearing masks at an event?" userNumber={this.state.q7} qNum={7} totalCallBack={this.handleTotalCallBack} maxPeople={10} marks={marks10} />
          <Question className="" question="How many people do you feel comfortable being around at an event?" userNumber={this.state.q8} qNum={8} totalCallBack={this.handleTotalCallBack} maxPeople={30} marks={marks50} />
        </div>

        <section className="">
          <div className="px-6 pb-4">
            <NavLink to="/homePage" onClick={this.buildPost}>
              <Button name="SUBMIT RESPONSES" bgColor="bg-coolGreen" hoverColor="bg-coolGreen-dark" />
            </NavLink>
          </div>
        </section>
      </div>
    )
  }
}

export default Questionnaire;