import React, { Component } from 'react';
import NavBar from '../components/navBar';
import Loading from '../components/loading';
import axios from 'axios';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import moment from "moment";

export class PastQuestionnaires extends Component {

  constructor(props) {
    super(props)
    this.state = {
      rows: []

    };
  }

  componentDidMount = () => {

    // if a user is not logged in, brings them to the login page
    if (!localStorage['user_id'] && !localStorage['authToken']) {
      this.props.history.push('/');
      localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
    }

    const token = localStorage.getItem("authToken").toString();
    console.log("User token on questionnaire page: ", token);
    axios.defaults.headers.common['Authorization'] = token;

    console.log("User id on past questionnaire page: ", localStorage['user_id']);
    axios.get(`/users/${localStorage['user_id']}/questionnaires`)
      .then(res => {
        this.setState({
          rows: res.data.map((entry) => {
            return (
            <TableRow key={entry.created_at}>
              <TableCell component="th" scope="row">
                {moment(entry.created_at).format("MMMM Do YYYY h:mm a")}
              </TableCell>
              <TableCell align="right">{entry.q1answer}</TableCell>
              <TableCell align="right">{entry.q2answer}</TableCell>
              <TableCell align="right">{entry.q3answer}</TableCell>
              <TableCell align="right">{entry.q4answer}</TableCell>
              <TableCell align="right">{entry.q5answer}</TableCell>
              <TableCell align="right">{entry.q6answer}</TableCell>
              <TableCell align="right">{entry.q7answer}</TableCell>
              <TableCell align="right">{entry.q8answer}</TableCell>
            </TableRow>)
            }),
        
        })
      }).then(() => {
        console.log(this.state);
      }).catch(err => {
        console.log(err);
      })
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
            <label htmlFor="title" className="text-3xl text-left block font-bold text-coolGrey-dark"> Past Questionnaires</label>
            <label htmlFor="title" className="text-lg text-left block text-coolGrey-dark mb-4">Here you will find all of your previous submitted questionnaire answers</label>
        </div>

        <div className="px-6 mt-3 py-5 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
        <TableContainer component={Paper}>
      <Table >
        <TableHead>
          <TableRow>
            <TableCell> Questionnaire Date/Time</TableCell>
            <TableCell align="right">Question 1</TableCell>
            <TableCell align="right">Question 2</TableCell>
            <TableCell align="right">Question 3</TableCell>
            <TableCell align="right">Question 4</TableCell>
            <TableCell align="right">Question 5</TableCell>
            <TableCell align="right">Question 6</TableCell>
            <TableCell align="right">Question 7</TableCell>
            <TableCell align="right">Question 8</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {this.state.rows}
        </TableBody>
      </Table>
    </TableContainer>
        </div>
        
      </div>      
    )
  }
}

export default PastQuestionnaires;