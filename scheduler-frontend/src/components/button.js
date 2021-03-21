import React from 'react'

const button = ({ name, bgColor }) => {
    return(
        <div className = "flex">
            <button 
                className={"flex hover:bg-coolGrey hover:shadow-md text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline shadow-xl " + bgColor} type="button">{name}</button>
        </div>
        
    )
}

export default button;