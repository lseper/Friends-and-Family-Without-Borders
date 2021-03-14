import React, { Component } from 'react'

const greenButton = ({ name }) => {
    return(
        <div>
<button className="bg-coolGreen hover:bg-coolGrey hover:shadow-md text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline shadow-xl" type="button">{name}</button>
        </div>
        
    )
}

export default greenButton;