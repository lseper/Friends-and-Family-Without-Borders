
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DateSelect = ({ handleCallback, label }) => {

    const [startDate, setStartDate] = useState(new Date());

    const handleDate = (event) => {
        setStartDate(event)
        handleCallback(event);
    }

    return (
        <>
            <div className="inline mb-1">
                <label className="text-coolGrey-dark">
                    <FontAwesomeIcon className="inline fa-sm mr-2" icon={faCalendarDay} />
                    <DatePicker
                        className="text-lg text-coolGrey-dark focus:outline-none"
                        selected={startDate}
                        onChange={date => handleDate(date)}
                        showTimeSelect
                        dateFormat="Pp"
                        minDate={new Date()} />
                    <hr
                        style={{
                            color: '#98D2EB',
                            backgroundColor: '#98D2EB',
                            height: 2
                        }}
                    />
                </label>
            </div>
            <label className={"text-xs block font-bold pb-2 text-coolGrey-dark text-left bg-grey-100 focus:outline-none"} >{label}</label>
        </>
    )
}


export default DateSelect;

