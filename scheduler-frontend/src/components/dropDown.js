import React, { Component } from 'react'

export class dropDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mycar: 'Volvo'
        };
      }

    render() {
        return (
            <div>
                <form>
                <select value={this.state.mycar}>
                    <option value="Ford">Ford</option>
                    <option value="Volvo">Volvo</option>
                    <option value="Fiat">Fiat</option>
                </select>
                </form>
            </div>
        )
    }
}

export default dropDown