import React from "react";
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Alert = ({ color, message }) => {
    const [showAlert, setShowAlert] = React.useState(true);

    return (
        <>
            {showAlert ? (
                <div
                    className=
                    {"text-white px-6 py-4 border border-white border-1 rounded relative bg-" + color}
                >
                    <span className="text-white inline-block mr-5 align-middle">
                        <FontAwesomeIcon className="inline fa-lg mr-2 " icon={faExclamationCircle} />
                    </span>
                    <span className="inline-block align-middle mr-8">
                        {message}
                    </span>
                    <button
                        className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
                        onClick={() => setShowAlert(false)}
                    >
                        <span>×</span>
                    </button>
                </div>
            ) : null}
        </>
    );
};

export default Alert;