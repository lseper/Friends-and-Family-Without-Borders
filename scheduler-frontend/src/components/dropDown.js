import React, { Component } from 'react';
import Popper from "popper.js";

const Dropdown = ({ color, name, option1, option2 }) => {
//export class Dropdown extends Component {
    // dropdown props
    const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
    const btnDropdownRef = React.createRef();
    const popoverDropdownRef = React.createRef();
    const openDropdownPopover = () => {
      new Popper(btnDropdownRef.current, popoverDropdownRef.current, {
        placement: "bottom-start"
      });
      setDropdownPopoverShow(true);
    };
    const closeDropdownPopover = () => {
      setDropdownPopoverShow(false);
    };
    //let label = name;
    
    // bg colors
    let bgColor;
    color === "white"
      ? (bgColor = "bg-gray-800")
      : (bgColor = "bg-" + color + "-500");
    return (
      <>
        <div className="flex flex-wrap">
          <div className="w-full px-4 py-3">
            <div className="relative inline-flex align-middle w-full">
              <button
                className={
                  "text-white bg-coolGrey font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 " +
                  bgColor
                }
                style={{ transition: "all .15s ease" }}
                type="button"
                ref={btnDropdownRef}
                onClick={() => {
                  dropdownPopoverShow
                    ? closeDropdownPopover()
                    : openDropdownPopover();
                }}
              >
                {color === "white" ? name : color + " Dropdown"}
              </button>
              <div
                ref={popoverDropdownRef}
                className={
                  (dropdownPopoverShow ? "block " : "hidden ") +
                  (color === "white" ? "bg-white " : bgColor + " ") +
                  "text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
                }
                style={{ minWidth: "12rem" }}
              >
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                    (color === "white" ? " text-coolGrey-dark" : "text-white")
                  }
                  onClick={e => e.preventDefault()}
                >
                  {option1}
                </a>
                <a
                  href="#pablo"
                  className={
                    "text-sm py-2 px-4 font-normal block w-full whitespace-no-wrap bg-transparent " +
                    (color === "white" ? " text-coolGrey-dark" : "text-white")
                  }
                  onClick={e => e.preventDefault()}
                >
                  {option2}
                </a>

                <div className="h-0 my-2 border border-solid border-t-0 border-gray-900 opacity-25" />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  export default Dropdown;
  
//   export default function DropdownRender() {
//     return (
//       <>
//         <Dropdown color="white" name = ""/>
//       </>
//     );
//   }