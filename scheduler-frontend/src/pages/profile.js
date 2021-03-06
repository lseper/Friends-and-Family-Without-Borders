import React, { Component } from 'react'
import NavBar from '../components/navBar';
import DropDown from '../components/dropDown';
import Button from '../components/button';
import axios from 'axios';
import Loading from '../components/loading';
import InputTextForm from '../components/inputTextForm';
import Alert from '../components/alert'

export class Profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      userName: '',
      password: '',
      email: '',
      publicInfo: '',
      showAlert: false,
    };
  }

  publicCallBack = (option) => {
    if (option === 1) {
      this.setState({ publicInfo: true });
    } else {
      this.setState({ publicInfo: false });
    }
  }

  async componentDidMount() {
    // if a user is not logged in, brings them to the login page
    if (!localStorage['user_id'] && !localStorage['authToken']) {
      this.props.history.push('/');
      localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
    }

    const authorization = localStorage.getItem('authToken');
    await axios.get(`/users/${localStorage['user_id']}`, {
      headers: {
        'Authorization': authorization
      }
    })
      .then(res => {

        this.setState({
          userName: res.data.username,
          email: res.data.email,
          publicInfo: res.data.privacy,
          comfortNum: res.data.comfort_metric,
          loading: false
        })
      }).then(() => {
        console.log(this.state);
      }).catch(err => {
        console.log(err);
      })
  }

  handleUsername= (inputText) => {
    this.setState({ userName: inputText })
  }

  buildPost = (event) => {

    event.preventDefault();
    let accountInformation = {
      username: this.state.userName,
      email: this.state.email,
      privacy: this.state.publicInfo
    }

    const authorization = localStorage.getItem('authToken');
    axios.put(`/users/${localStorage['user_id']}`, accountInformation, {
      headers: {
        'Authorization': authorization
      }
    })
      .then(res => {
        this.setState({ showAlert: true });
        localStorage.setItem('UpdateErrors', "None");
        console.log("Account has been updated!");
      }).catch(() => {
        console.log("We ran into an issue");
        localStorage.setItem('UpdateError', "Error Updating Account");
      })
  }

  render() {
    if (this.state.publicInfo === '') {
      return (<Loading />)
    }
    return (
      <div>
        <NavBar />
        {this.state.loading ?
          <Loading /> :
          null
        }
        {this.state.showAlert ?
          <div>
              <Alert color = "coolGreen" message ="Your profile information has been updated!"/>
          </div>
          : null
          }
        <section className="App py-5 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
          <div className="px-1">
            <label htmlFor="title" className="text-3xl text-left block font-bold pt-2 text-coolGrey-dark"> Your Profile</label>
            <div className="flex">
              <label htmlFor="title" className="text-lg text-left block pb-2 text-coolGrey-dark border-coolGrey"> View and Update Information</label>
            </div>
          </div>

        </section>
        <section className="flex flex-grow align-start items-start py-4 px-5 md:w-5/6 w-full">
          <form action="" className="flex grid grid-cols-1 flex-grow bg-white border-2 rounded px-8 py-8 pt-8">
            <InputTextForm isDisabled={true} focusRing = 'coolGreen' color = '#8FD468' type="text" label="EMAIL" placeholder={this.state.email}/>
            &nbsp;&nbsp;&nbsp;
            <InputTextForm isDisabled={false} focusRing = 'coolGreen' color = '#8FD468' handleCallBack={this.handleUsername} type="text" label="USERNAME" placeholder={this.state.userName}/>
            &nbsp;&nbsp;&nbsp;
            <DropDown name="EVENT RESPONSES PRIVATE" 
              initalState={this.state.publicInfo} 
              downlable={true} 
              handleCallback={this.publicCallBack} 
              data = {[
                {
                  value: 1,
                  label: "Yes"
                },
                {
                  value: 2,
                  label: "No"
                }
              ]}  
              border="border-coolGreen"
              backgroundColor = "bg-coolGreen"
              primaryColor = '#8FD468' />
            <div onClick={this.buildPost} className="w-full">
              <Button name="UPDATE" bgColor="bg-coolGreen" hoverColor = "bg-coolGreen-dark"/>
            </div>
          </form>
        </section>
      </div>
    )
  }
}

export default Profile;