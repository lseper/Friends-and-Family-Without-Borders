import React, { Component } from 'react'

export class firstComponent extends Component {
    constructor(props) {
        super(props);
        //fields
        //this.state = {
            //counter: 0
        //};
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.props.name}</h1>
            </div>
        )
    }
}

export default firstComponent
