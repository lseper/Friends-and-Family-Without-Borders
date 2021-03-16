import React, { Component } from 'react';
import Slider from '../components/slider';

export class question extends Component {

     handleCallback = (sliderData) => {
       //this.setState({data: sliderData})
       this.props.totalCallBack(sliderData);
     }

    render() {
      
        return (
            <div className="flex-1 w=9/10 flex-shrink justify-evenly align-center items-center max-w-sm mx-auto bg-coolGrey m-2 h-full py-1 px-2" >
              <form action="" className="flex-1 justify-evenly align-center items-centerbg-white shadow-md rounded px-4 py-2 md:container sm:flex-shrink bg-white">
                  <div>
                    <label htmlFor="title" className="text-left text-md block font-bold pb-10 text-coolGrey-dark mb-2">{this.props.question} </label>
                    <Slider color = "bg-coolGreen" userNumber = {this.props.userNumber || 0} callBack = {this.handleCallback}/>
                </div>
              </form>
            </div>
        )
    }
}

  export default question;