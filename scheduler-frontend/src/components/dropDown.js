import React from 'react';
import Select from 'react-select';

const DropDown = ({ name, option1, option2, handleCallback, initalState, border, downlable}) => {

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

    let initalValue;

    if (initalState){
      console.log("test")
      initalValue = {
      value: 1,
      label: option1
      } 
    }    
    else {
      initalValue = {
      value: 2,
      label: option2
      }
    }   

    const selectedValue = React.useState(initalValue);

    const handleChange = (event, newValue) => {
      handleCallback(event.value)
    };

    console.log(selectedValue);

    return(
        <div className="w-full pb-4 bg-grey-100">
            {downlable ? null
                :< label className={"text-sm block font-bold pb-2 text-coolGrey-dark text-left"} >{name}</label>}
            <Select className={"text-sm block pb-2 text-coolGrey-dark text-left bg-coolGreen border" + border} 
                options={data}
                onChange = {handleChange} 
                value={data.find(obj => obj.value === selectedValue.value)} 
                defaultValue={selectedValue}
                theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: '#BDE4A7',
                      primary: '#A4969B',
                    }})}
                />
                {downlable ? <div>
                        < label className={"text-sm block font-bold text-coolGrey-dark text-left"} >{name}</label>
                        </div>
                    : null
                }
        </div>
    )
}

export default DropDown;