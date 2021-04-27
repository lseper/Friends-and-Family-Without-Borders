import React, { Component } from 'react';

export class ShowText extends Component {

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
                <p className={"text-lg block font-bold text-coolGrey-dark text-left bg-grey-100"} >{this.props.placeholder}</p>
                <hr
                    style={{
                        color: '#8FD468',
                        backgroundColor: '#8FD468',
                        height: 2
                    }}
                />
                <label className={"text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100"} >{this.props.label}</label>
            </div>
        )
    }
}

export default ShowText;