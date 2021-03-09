import React, { Component } from 'react';
import Slider from '../components/slider';

export class question extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
     }

    render() {
        return (
            <div className="w-full max-w-md bg-gray-800 m-2 h-full" >
              <form action="" className="bg-white shadow-md rounded px-8 py-8 pt-8 ">
              <label htmlFor="title" className="text-xl block font-bold  pb-2 text-coolGrey-dark mb-2">{this.props.question} </label>
                <Slider color = "bg-coolGreen"/>
              </form>
            </div>
        )
    }
}

  export default question;