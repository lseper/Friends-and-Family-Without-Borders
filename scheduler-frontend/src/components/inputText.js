import React, { Component } from 'react';

export class InputText extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleCallback = (event) => {
        this.props.handleCallback(event.target.value);
    }


    render() {
        return (
            <div className="w-full pb-4 bg-grey-100">
                {this.props.login ?
                    <div>
                        <label htmlFor={this.props.type} className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >{this.props.label}</label>
                        <input onChange={this.handleCallback} type={this.props.type} name={this.props.type} className={"shadow bg-white appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-coolGrey-dark " + this.props.borderColor} placeholder={this.props.placeholder} />
                    </div>
                    :
                    <div>
                        <label htmlFor={this.props.type} className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >{this.props.label}</label>
                        <input onChange={this.handleCallback} type={this.props.type} name={this.props.type} className={"shadow bg-white appearance-none rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-coolGrey-dark " + this.props.borderColor} placeholder={this.props.placeholder} />
                    </div>
                }
            </div>
        )
    }
}

export default InputText;
