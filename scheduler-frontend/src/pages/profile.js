import React, { Component } from 'react'
import NavBar from '../components/navBar';
import DropDown from '../components/dropDown';
import Button from '../components/button';
import axios from 'axios';
import Loading from '../components/loading';


export class profile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      preferredName: '',
      userName: '',
      password: '',
      phoneNumber: '',
      publicInfo: '',
      comfortNum: 0,
      comfort: ''
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
        console.log(res.data);
        this.setState({
          preferredName: res.data.name,
          userName: res.data.username,
          phoneNumber: res.data.phone,
          publicInfo: res.data.privacy,
          comfortNum: res.data.comfort_metric,
          loading: false
        })
        // set the color of the comfort metric
        if (this.state.comfortNum < (1 / 3)) {
          this.setState({ comfort: "red" });
        } else if (this.state.comfortNum >= (1 / 3) & this.state.comfortNum < (2 / 3)) {
          this.setState({ comfort: "yellow" });
        } else {
          this.setState({ comfort: "green" });
        }
      }).then(() => {
        console.log(this.state);
      }).catch(err => {
        console.log(err);
      })
  }

  handleUserName = (inputText) => {
    this.setState({ userName: inputText.target.value })
  }
  handlePreferredName = (inputText) => {
    this.setState({ preferredName: inputText.target.value })
  }

  buildPost = (event) => {
    event.preventDefault();
    let accountInformation = {
      username: this.state.userName,
      name: this.state.preferredName,
      privacy: this.state.publicInfo
    }
    console.log(accountInformation);
    const authorization = localStorage.getItem('authToken');
    axios.put(`/users/${localStorage['user_id']}`, accountInformation, {
      headers: {
        'Authorization': authorization
      }
    })
      .then(res => {
        localStorage.setItem('UpdateErrors', "None");
        console.log("Account has been updated!");
      }).catch(() => {
        console.log("We ran into an issue");
        localStorage.setItem('UpdateError', "Error Updating Account");
      })
  }

  render() {
    let comfort;
    if (this.state.comfort === "green") {
      comfort = <div className="rounded-full h-10 w-10 flex items-left bg-coolGreen py-2 px-2"></div>;
    } else if (this.state.comfort === "yellow") {
      comfort = <div className="rounded-full h-10 w-10 flex items-left bg-yellow-500 py-2 px-2"></div>
    } else {
      comfort = <div className="rounded-full h-10 w-10 flex items-left bg-red-500 py-2 px-2"></div>
    }
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
        <section className="App py-5 px-5 grid grid-cols-1 w-full flex justify-start items-coolGrey-dark md:w-5/6">
          <div className="px-1">
            <label htmlFor="title" className="text-3xl text-left block font-bold pb-2 text-coolGrey-dark"> Your Profile</label>
            <div className="flex">
              <label htmlFor="title" className="text-lg text-left block pb-2 pt-1 text-coolGrey-dark border-coolGrey"> Comfort </label>
              <div className="px-1 pb-1 flex">
                {comfort}
              </div>
            </div>
          </div>


        </section>
        <section className="flex flex-grow align-start items-start py-4 px-5 md:w-5/6 w-full">
          <form action="" className="flex grid grid-cols-1 flex-grow bg-white border-2 rounded px-8 py-8 pt-8">
            <p className={"text-lg block font-bold text-coolGrey-dark text-left bg-grey-100"} >{this.state.userName}</p>
            <hr
              style={{
                color: "#BDE4A7",
                backgroundColor: "#BDE4A7",
                height: 2
              }}
            />
            <p className={"text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >USERNAME</p>
            &nbsp;&nbsp;&nbsp;
            <p className={"text-lg block font-bold text-coolGrey-dark text-left bg-grey-100"} >{this.state.phoneNumber}</p>
            <hr
              style={{
                color: "#BDE4A7",
                backgroundColor: "#BDE4A7",
                height: 2
              }}
            />
            <p className={"text-xs block font-bold text-coolGrey-dark text-left bg-grey-100"} >PHONE NUMBER</p>
            &nbsp;&nbsp;&nbsp;
            <input onChange={name => this.handlePreferredName(name)} type="text" className={"text-lg focus:ring-2 focus:ring-coolGreen block font-bold pb-2 text-coolGrey-dark focus:outline-none text-left"} placeholder={this.state.preferredName}></input>
            <hr
              style={{
                color: "#BDE4A7",
                backgroundColor: "#BDE4A7",
                height: 2
              }}
            />
            <p className={"text-xs block font-bold text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >PREFERRED NAME</p>
                  &nbsp;&nbsp;&nbsp;
                  <DropDown name="INFORMATION PUBLIC TO USERS" initalState={this.state.publicInfo} downlable={true} handleCallback={this.publicCallBack} option1="Yes" option2="No" border="border-coolGreen" />
            <div onClick={this.buildPost} className="w-full">
              <Button name="Update" bgColor="bg-coolGreen" />
            </div>
          </form>
        </section>
      </div>
    )
  }
}

export default profile;