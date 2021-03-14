import React, { Component } from 'react'
import Picture from '../images/profileimage.png';

//has profile picture image 
class Banner extends Component {
    render() {
        return (
            <section className="flex flex-wrap justify-center">
                <div className="w-6/12 sm:w-2/12 px-4 py-4">
                    <a href="#home"><img id="profilepic" src={Picture}  width="170" height="170" alt="profilepic"/></a>
                    <p className="text-3xl block font-bold  pb-2 text-coolGrey-dark text-center"> {this.props.username} </p>
                </div>  
            </section>
        )
    }
}

export default Banner