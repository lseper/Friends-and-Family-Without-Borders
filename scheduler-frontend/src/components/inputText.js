import React, { Component } from 'react';
//import ClassNames from 'classnames';

export class inputText extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
     }

    render() {
        return (
            <div className="px-4 pb-4">
                <label htmlFor={this.props.type} className={"text-sm block font-bold pb-2 text-coolGrey-dark"} >{this.props.label}</label>
                <input type={this.props.type} name={this.props.type} id="" className={"shadow appearance-none border border-coolGreen rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-coolGrey-dark border-"} placeholder={this.props.placeholder} />
          </div>
        )
    }
}

  export default inputText;
