import React, { Component } from 'react'
import Select from 'react-select'

const dropDown = ({ name, option1, option2 }) => {
    return(
        <div className="px-4 pb-4">
            <label className={"text-sm block font-bold pb-2 text-coolGrey-dark"} >{name}</label>
            <Select className={"text-sm block pb-2 text-coolGrey-dark bg-coolBlue"} options={[
                { value: option1, label: option1},
                { value: option2, label: option2 },
                ]} />
        </div>
    )
}

export default dropDown;
