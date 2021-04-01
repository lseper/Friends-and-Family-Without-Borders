import React, { Component } from 'react';

export class InputTextFormBlue extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleCallBack = (event) => {
        this.props.handleCallBack(event.target.value);
    }

    render() {
        return (
            <div className = "w-full">
                <input onChange={name => this.handleCallBack(name)} type={this.props.type} className={"text-lg w-full focus:ring-2 focus:ring-coolBlue block pb-1 text-coolGrey-dark focus:outline-none text-left"} placeholder={this.props.placeholder}></input>
                <hr
                    style={{
                        color: '#98D2EB',
                        backgroundColor: '#98D2EB',
                        height: 2
                    }}
                />
                <label className={"text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >{this.props.label}</label>
            </div>
        )
    }
}

export default InputTextFormBlue;