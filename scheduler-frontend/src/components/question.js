import React, { Component } from 'react';
import Slider from '../components/slider';

export class Question extends Component {

  handleCallback = (sliderData) => {
    this.props.totalCallBack(sliderData, this.props.qNum);
  }

  render() {
    return (
      <div className="flex flex-grow align-start items-start py-4 px-5 w-full md:w-3/4" >
        <form action="" className="flex flex-grow grid grid-cols-1 justify-start align-left items-left bg-white border-2 rounded px-8 py-8 pt-8 container bg-white">
          <div className="flex flex-wrap">
            <label htmlFor="title" className="text-left text-md block font-bold pb-3 text-coolGrey-dark mb-2">{this.props.question} </label>
          </div>
          <div>
            <Slider color="bg-coolGreen" userNumber={this.props.userNumber || 0} callBack={this.handleCallback} maxPeople = {this.props.maxPeople} marks = {this.props.marks}/>
          </div>
        </form>
      </div>
    )
  }
}

export default Question;