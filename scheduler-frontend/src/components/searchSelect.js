import React, { useState } from 'react';
import Select from 'react-select';

const SearchSelect = ({ handleCallback, label, data }) => {

    const [invitee, setInvitees] = useState([]);

    const handleSelectChange = (event) => {
        setInvitees(event)
        handleCallback(event);
    }

    return (
        <>
            <Select
                isMulti
                name="colors"
                options={data}
                onChange={(newValue) => handleSelectChange(newValue)}
                className="basic-multi-select"
                classNamePrefix="select"
                theme={theme => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                        ...theme.colors,
                        primary25: '#98D2EB',
                        primary: '#454851',
                    }
                })}
            />
            <label className={"inline text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >SEARCH AND ADD INVITEES</label>
        </>
    )
}


export default SearchSelect;