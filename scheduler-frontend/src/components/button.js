import React from 'react'

const Button = ({ name, bgColor, type, hoverColor, widthFull }) => {
    return (
        <div className="flex">
            <button
                className={"flex text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline shadow-xl " + bgColor + " hover:" + hoverColor + " " + widthFull} type={type}>{name}</button>
        </div>

    )
}

export default Button;