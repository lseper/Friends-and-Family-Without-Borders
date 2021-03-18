import React from 'react';
import Select from 'react-select'

const DropDown = ({ name, option1, option2, handleCallback, initalState}) => {

    const data = [
        {
          value: 1,
          label: option1
        },
        {
          value: 2,
          label: option2
        }
      ];
    
      const inital = 1; 
      if (initalState){
        inital = initalState;
      }

      const selectedValue = React.useState(inital);

      const handleChange = (event, newValue) => {
        //setSelectedValue(event.value);
        handleCallback(event.value)
      };

    return(
        <div className="px-4 pb-4">
            <label className={"text-sm block font-bold pb-2 text-coolGrey-dark"} >{name}</label>
            <Select className={"text-sm block pb-2 text-coolGrey-dark bg-coolBlue"} 
                options={data}
                onChange = {handleChange} 
                value={data.find(obj => obj.value === selectedValue)} 
                />
        </div>
    )
}

export default DropDown;
