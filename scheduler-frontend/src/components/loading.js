import React, { Component } from 'react'
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export class loading extends Component {

    render() {
        return (
            <div>
                <div className="w-full h-full fixed block top-0 left-0 bg-white opacity-75 z-50">
                    <span className="text-coolGrey opacity-75 top-1/2 my-0 mx-auto block relative w-0 h-0">
                        <div>
                            <FontAwesomeIcon className="fa-4x fa-spin" icon={faCircleNotch} />
                        </div>
                    </span>
                </div>
            </div>
        )
    }
}

export default loading