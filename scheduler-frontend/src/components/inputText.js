import React, { Component } from 'react';

export class inputText extends Component {

    constructor(props){
        super(props);
         this.state = { 

         };
      }

      handleCallback = (event) => {
        //this.setState({data: sliderData})
        this.props.handleCallback(event.target.value);
      }

    render() {
        return (
            <div className="px-4 pb-4 bg-grey-100">
                <label htmlFor={this.props.type} className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >{this.props.label}</label>
                <input onChange = {this.handleCallback} type={this.props.type} name={this.props.type} className={"shadow bg-white appearance-none border border-coolGreen rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-coolGrey-dark border-"} placeholder={this.props.placeholder} />
          </div>
        )
    }
}

  export default inputText;
