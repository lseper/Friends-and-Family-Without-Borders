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
      comfort: 'green'
    };
  }

  publicCallBack = (option) => {
    if (option === 1) {
      this.setState({ publicInfo: true });
    } else {
      this.setState({ publicInfo: false });
    }

  }

  handleUserName = (inputText) => {
    console.log(inputText.target.value)
    this.setState({ userName: inputText.target.value })
  }
  handlePreferredName = (inputText) => {
    console.log(inputText.target.value)
    this.setState({ preferredName: inputText.target.value })
  }

  buildPost = () => {
    const newaccountinfo = [this.state.userName, this.state.preferredName, this.state.publicInfo, this.state.phoneNumber]
    console.log(newaccountinfo);
    this.componentDidMount();
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
        console.log(res.data.privacy)
        console.log(typeof (res.data.privacy))
        this.setState({
          preferredName: res.data.name,
          userName: res.data.username,
          phoneNumber: res.data.phone,
          //not updating
          publicInfo: res.data.privacy,
          loading: false
        })
        console.log(this.state.phoneNumber)
      }).then(() => {
        console.log(this.state);
      }).catch(err => {
        console.log(err);
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
          <div className="px-1 pb-1">
            <label htmlFor="title" className="text-3xl text-left block font-bold pb-2 text-coolGrey-dark"> YOUR PROFILE</label>
          </div>
          <div className="px-1 pb-1 flex">
            <label htmlFor="title" className="text-xl text-left block font-bold pb-2 text-coolGrey-dark border-l-2 border-coolGrey"> COMFORT </label>
            <div className="px-1 pb-1 flex">
              {comfort}
            </div>


          </div>
        </section>

        <section className="flex flex-grow align-start items-start py-4 px-5 md:w-5/6 w-full">
          <form action="" className="flex grid grid-cols-1 w-1/2 flex-grow bg-white shadow-lg rounded px-8 py-8 pt-8">
            <text className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >{this.state.phoneNumber}</text>
            <hr
              style={{
                color: "#A4969B",
                backgroundColor: "#A4969B",
                height: 2
              }}
            />
            <text className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >PHONE NUMBER</text>
          </form>
        </section>
        <section className="flex flex-grow align-start items-start py-4 px-5 md:w-5/6 w-full">
          <form action="" className="flex grid grid-cols-1 flex-grow bg-white shadow-lg rounded px-8 py-8 pt-8">
            <input onChange={name => this.handleUserName(name)} type="text" className={"text-sm focus:ring-2 focus:ring-coolGreen block font-bold pb-2 text-coolGrey-dark focus:outline-none text-left bg-grey-100"} placeholder={this.state.userName}></input>
            <hr
              style={{
                color: "#BDE4A7",
                backgroundColor: "#BDE4A7",
                height: 2
              }}
            />
            <text className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >USERNAME</text>
            &nbsp;&nbsp;&nbsp;
            <input onChange={name => this.handlePreferredName(name)} type="text" className={"text-sm focus:ring-2 focus:ring-coolGreen block font-bold pb-2 text-coolGrey-dark focus:outline-none text-left"} placeholder={this.state.preferredName}></input>
            <hr
              style={{
                color: "#BDE4A7",
                backgroundColor: "#BDE4A7",
                height: 2
              }}
            />
            <text className={"text-sm block font-bold text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >PREFERRED NAME</text>
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