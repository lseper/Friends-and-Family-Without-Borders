import React, { Component } from 'react';
import CreatedEventButton from '../components/createdEventsButton';
import NavBar from '../components/navBar';

import { NavLink } from 'react-router-dom';

export class createdEvents extends Component {
    
    constructor(props){  
        super(props);  
        this.state = {
            createdEvents: false
        };  
    }

    componentDidMount() {
        // if a user is not logged in, brings them to the login page
        if(!localStorage['user_id'] && !localStorage['authToken']) {
          this.props.history.push('/');
          localStorage.setItem('LoginErrors', 'You were signed out, please sign in again');
        }
    }
    
    render() {
        return (
            <div>
                <NavBar />
                <div>                   
                    <div className="App pt-10 w-full flex justify-start px-2 items-coolGrey">
                        <label htmlFor="title" className="text-4xl text-left block font-bold  pb-2 text-brightPink mb-2 ml-2 px-2" >CREATED EVENTS</label>
                    </div> 
                    <div className = "pb-10 px-2">
                        <NavLink to = "/createEvent">
                            <button className=" bg-coolBlue py-2 px-5 rounded hover:bg-coolBlue-dark hover:shadow-md font-bold text-white focus:outline-none focus:shadow-outline shadow-xl ml-2">+ CREATE EVENT</button>
                        </NavLink>
                    </div>

                    
                    {this.state.createdEvents ?
                        <div className ="flex grid grid-cols-1 flex place-items-left bg-coolGrey py-4">
                        
                            <CreatedEventButton />
                            <CreatedEventButton />
                            <CreatedEventButton />
                                       
                        </div>
                        : null   
                    } 
                
                    {this.state.createdEvents === false?  
                        <div className = "bg-white px-4 py-4">
                            <div className = "bg-coolBlue">
                            <label htmlFor="title" className="text-xl block font-bold rounded pb-6 text-white mb-2 ml-2 px-10 py-10">YOU CURRENTLY HAVE NO EVENTS CREATED</label>
                            </div>   

                         </div>     
                            : null  


                    }         
                </div>
              <section className="App min-h-0 w-full flex justify-evenly align-bottom items-center bg-grey-500 py-8 px-4">
              </section>
            </div>


                    

 
        )
    } 
}

export default createdEvents