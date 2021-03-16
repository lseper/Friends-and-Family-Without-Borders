import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class createdEventsButton extends Component {

  constructor(props){
    super(props);
    this.state = { 
      name: '',
      dateString: '',
      location: '',
    };
  }

    render() {
        return (   
            <div className="w-9/10 bg-coolGrey m-2 h-full px-2" >
              <form action="" className="bg-white shadow-md rounded px-8 py-8 pt-8 ">
                    <h2 className="text-2xl font-bold text-coolGrey-dark">{this.props.name}</h2>
                    <h3 className="font-bold text-coolGrey-dark">Date: {this.props.dateString}</h3>
                    <h3 className="font-bold text-coolGrey-dark">Location: {this.props.location}</h3>
                    &nbsp;&nbsp;&nbsp;
                    <div className = "">
                      <NavLink to = "/homePage">
                        <button className="bg-coolGreen bg-brightPink hover:bg-brightPink-dark text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline shadow-xl" type="button">Click For Event Details</button>
                      </NavLink>
                  </div>
                    &nbsp;&nbsp;&nbsp;
                
              </form>
            </div>
        )
    }
}

export default createdEventsButton