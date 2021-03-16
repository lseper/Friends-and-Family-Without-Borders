import React, { Component } from 'react'

export class createdEventsButton extends Component {
    
    render() {
        return (
           
            <div className="w-9/10 max-w-md bg-coolGrey m-2 h-full" >
              <form action="" className="bg-white shadow-md rounded px-8 py-8 pt-8 ">
                    <h2 className="text-2xl font-bold">JAYDEN'S BIRTHDAY BASH</h2>
                    <h3>Date: 3/8/2021</h3>
                    <h3>Location: Kauffman</h3>
                    <h4 className="text-xs mt-1 bg-coolGrey hover:bg-coolGrey-dark hover:shadow-md shadow-xl py-2 px-5 text-white rounded w-4/5">CLICK FOR FULL REPORT</h4>
                </form>
            </div>
        )
    }
}

export default createdEventsButton