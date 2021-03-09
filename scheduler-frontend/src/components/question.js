import React, { Component } from 'react';

export class question extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
     }

    render() {
        return (
            <div className="w-full max-w-md bg-gray-800 m-2" >
              <form action="" className="bg-white shadow-md rounded px-8 py-8 pt-8 ">
                <div className ="px-2 py-2">
                <label htmlFor="title" className="text-xl block font-bold  pb-2 text-coolGrey-dark mb-2">Example Question</label>
                    <button className="bg-coolGrey hover:bg-coolGrey item-end inset-y-0 right-0 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline " type="button">Potential Answer 1</button>
                </div>
                <div className ="px-2 py-2">
                    <button className="bg-coolGrey hover:bg-coolGrey item-end inset-y-0 right-0 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline " type="button">Potential Answer 2</button>
                </div>
                <div className ="px-2 py-2">
                    <button className="bg-coolGrey hover:bg-coolGrey item-end inset-y-0 right-0 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline " type="button">Potential Answer 3</button>
                </div>
                <div className ="px-2 py-2">
                    <button className="bg-coolGrey hover:bg-coolGrey item-end inset-y-0 right-0 text-white font-bold py-2 w-full rounded focus:outline-none focus:shadow-outline " type="button">Potential Answer 4</button>
                </div>
              </form>
            </div>
        )
    }
}

  export default question;