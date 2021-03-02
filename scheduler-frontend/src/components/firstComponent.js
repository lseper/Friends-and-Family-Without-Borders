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
                <h1>{this.props.name}Page</h1>
            </div>
        )
    }
}

export default firstComponent
