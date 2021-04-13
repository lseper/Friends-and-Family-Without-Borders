import React from 'react';
import Select from 'react-select';

const DropDown = ({ name, data, handleCallback, initalState, border, downlable, backgroundColor, primaryColor }) => {

  let initalValue;
  if (initalState !== undefined){
    if (initalState) {
      console.log("test")
      initalValue = data[0]
    }
    else {
      initalValue = data[1]
    }
  }

  const selectedValue = React.useState(initalValue);

  const handleChange = (event) => {
    handleCallback(event.value)
  };

  return (
    <div className="w-full pb-4 bg-grey-100">
      {downlable ? null
        : < label className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left"} >{name}</label>}
      <Select className={"pb-2 text-coolGrey-dark text-left border" + border + " " + backgroundColor}
        options={data}
        onChange={handleChange}
        value={data.find(obj => obj.value === selectedValue.value)}
        defaultValue={selectedValue}
        theme={theme => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            // set color
            primary25: primaryColor,
            primary: '#454851',
          }
        })}
      />
      {downlable ? <div>
        < label className={"text-xs block font-bold text-coolGrey-dark text-left"} >{name}</label>
      </div>
        : null
      }
    </div>
  )
}

export default DropDown;