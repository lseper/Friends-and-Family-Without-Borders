import React, { Component } from 'react';
import NavBar from '../components/navBar';
import TopBar from '../components/topBar';
import Question from '../components/question';

export class questionnaire extends Component {
    constructor(props){
        super(props)

        this.state = {
            emilysState: 'hello',
        }
    }
    render() {
        return (
            <div>
                <TopBar />
                <NavBar />
                    <div className = "flex flex-wrap w-full mr-auto ml-auto justify-center">
                        <Question className="w-1/2"/>
                        <Question className="w-1/2"/>
                        <Question className="w-1/2"/>
                        <Question className="w-1/2"/>
                        <Question className="w-1/2"/>
                        <Question className="w-1/2"/>
                        <Question className="w-1/2"/>
                        <Question className="w-1/2"/>
                    </div>
            </div>

        )
    } 
}

export default questionnaire