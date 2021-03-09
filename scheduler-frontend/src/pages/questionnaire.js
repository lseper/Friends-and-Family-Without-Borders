import React, { Component } from 'react';
import NavBar from '../components/navBar';
import TopBar from '../components/topBar';
import Question from '../components/question';
import { NavLink } from 'react-router-dom';

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
                {/* <TopBar /> */}
                <NavBar />
                    <div className = "flex flex-wrap w-full mr-auto ml-auto justify-center">
                        <Question className="w-1/2" question = "Would you be okay with indoor events?" option1 = "yes" option2 ="no" option3 = "it depends" option4="prefer not to answer"/>
                        <Question className="w-1/2" question = "Are you okay with being unmasked?" option1 = "yes" option2 ="no" option3 = "it depends" option4="prefer not to answer"/>
                        <Question className="w-1/2" question = "Have you attended an in person events?" option1 = "yes" option2 ="no" option3 = "it depends" option4="prefer not to answer"/>
                        <Question className="w-1/2" question = "Do you really care at all about the pandemic?" option1 = "yes" option2 ="no" option3 = "it depends" option4="prefer not to answer"/>
                        <Question className="w-1/2" question = "Are you done with Covid?" option1 = "yes" option2 ="no" option3 = "it depends" option4="prefer not to answer"/>
                        <Question className="w-1/2" question = "Would you be okay with indoor events?" option1 = "yes" option2 ="no" option3 = "it depends" option4="prefer not to answer"/>
                        <Question className="w-1/2" question = "Would you be okay with indoor events?" option1 = "yes" option2 ="no" option3 = "it depends" option4="prefer not to answer"/>
                    </div>
                    <section className="App min-h-0 w-full flex justify-evenly align-bottom items-center bg-grey-500 py-4 px-4">
                        <div className="px-1 pb-1">
                        <NavLink to = "/">
                            <button className="bg-coolGreen hover:bg-coolGrey item-end justify-bottom text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline " type="button">Update Questionnaire Responses</button>
                        </NavLink>
                        </div>
                    </section>
            </div>
            

        )
    } 
}

export default questionnaire