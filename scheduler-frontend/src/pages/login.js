import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import InputText from '../components/inputText';
import GreenButton from '../components/greenButton';
import axios from 'axios';

export class login extends Component {

    //getInformation using fetch instead of axios
    //  //before components gets added to a page -- do this
    //  componentDidMount(){
    //    this.UserList();
    //  }

    //  //id comes from backend 
    //  //pass id as a prop for each component 
    //  //<navigation to {"/events/" + eventid}
    //  //https://jsonplaceholder.typicode.com/events/:id
    //  async UserList(){
    //    //get object
    //    //
    //   let response =  await fetch('https://jsonplaceholder.typicode.com/users/') //make sure this responds before moving to text function
    //   response = await response.json()
    //   console.log(response)
    //  }

    // //call this on a button click to send to backend 
    // async sendInformationToBackend() {
    //     // POST request using fetch with async/await
    //     //json obejct is teh body 
    //     const requestOptions = {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         //stores as string might 
    //         body: JSON.stringify({ id: '12345', email:'someemail', pass:'somepass' })
    //     };
    //     const response = await fetch('https://jsonplaceholder.typicode.com/posts', requestOptions);
    //     const data = await response.json();
    //     this.setState({ postId: data.id });
    // }

    constructor(props){
      super(props);
      this.state = { 
        userName: '',
        password: '',
        error: ''
      };
    }

    //get user id based of of username and password 
    //set user id to be used across pages 

    buildPost = () => {
      let loginInfo = {
        username: this.state.userName, 
        password: this.state.password
      }
      console.log(loginInfo);
      //will send in post request

      axios.post('/login', loginInfo)
      .then(res => {
        const authorization = `Bearer ${res.data.auth_token}`;
        localStorage.setItem('authToken', authorization);
        const userId = res.data.user_id;
        localStorage.setItem('user_id', userId)
        axios.defaults.headers.common['Authorization'] = authorization;
        console.log("We have successfully logged in!");
        console.log("Authorization token is:", localStorage['authToken']);
        console.log("User id is:", localStorage['user_id']);
      }).catch(err => {
        this.setState({
          error: err.message
        })
        console.log("Did not log in");
      })
    }


    userNameCallBack = (inputText) => {
      this.setState({userName: inputText})
    }

    passwordCallBack = (inputText) => {
      this.setState({password: inputText})
    }

    render() {
        return (
          <div className ="">
            
            <section className="App py-10 px-10 w-full flex justify-center items-coolGrey">
              <div className="px-1 pb-1">
                  <label htmlFor="title" className="text-3xl block font-bold  pb-2 text-coolGrey-dark">FRIENDS AND FAMILIES WITH BORDERS</label>
              </div>
            </section>
            <div className = "flex px-4 py-10 w-full justify-center items-start bg-coolGrey">
            <section className="App h-2/3 w-full flex justify-center items-start bg-grey-500 py-4 px-4">
              <div className="w-full max-w-md bg-gray-800" >
                <form action="" className=" bg-white shadow-md rounded px-8 py-8 pt-8">
                  <InputText handleCallback = {this.userNameCallBack} type = "text" border = "coolGreen" placeholder = "exampleUsername" label = "USERNAME"/>
                  <InputText handleCallback = {this.passwordCallBack} type = "password" border = "coolGreen" placeholder = "examplePassword" label = "PASSWORD"/>
                  &nbsp;&nbsp;&nbsp;
                  <div onClick = {this.buildPost}>
                    <NavLink to = "/homePage">
                      <GreenButton name = "Sign In"/>
                    </NavLink>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div className="px-4">
                    <p className="text-sm text-coolGrey-dark font-sans py-1 px-10 rounded focus:outline-none focus:shadow-outline" >
                      Forgot your password? 
                      <NavLink to = "/createAccount">
                          <button className="hover:text-coolBlue-dark text-coolBlue"> Click here</button>
                      </NavLink>
                    </p>
                    <p className="text-sm text-coolGrey-dark font-sans py-1 px-10 rounded focus:outline-none focus:shadow-outline" >
                      Don't have an account? 
                      <NavLink to = "/createAccount">
                          <button className="hover:text-coolBlue-dark text-coolBlue"> Sign up here</button>
                      </NavLink>
                    </p>
                  </div>
                </form>
                </div>
              </section>
              </div> 
              <section className="App pb-10 px-10 w-full flex justify-center items-coolGrey">
              <div className="px-1 pb-1">
              </div>
            </section>
          </div>
        )
    } 
}

export default login;