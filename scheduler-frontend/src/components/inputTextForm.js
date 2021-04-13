import React, { Component } from 'react';

export class InputTextForm extends Component {

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
                <input onChange={name => this.handleCallBack(name)} type={this.props.type} className={"text-lg w-full focus:ring-2 block pb-1 text-coolGrey-dark focus:outline-none text-left focus:ring-" + this.props.focusRing} placeholder={this.props.placeholder}></input>
                <hr
                    style={{
                        color: this.props.color,
                        backgroundColor: this.props.color,
                        height: 2
                    }}
                />
                <label className={"text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >{this.props.label}</label>
            </div>
        )
    }
}

export default InputTextForm;