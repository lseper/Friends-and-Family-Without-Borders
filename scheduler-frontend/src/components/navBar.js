import { NavLink } from 'react-router-dom';
import { withRouter } from "react-router";
import { AiOutlineBars } from "react-icons/ai";


import React from "react";

const logout = () => {
  console.log("Logging out")
  localStorage.setItem('authToken', '');
  localStorage.setItem('user_id', '');

  console.log("Authorization token after logging out: ", localStorage['authToken']);
  console.log("User id after loggin out: ", localStorage['user_id']);

  if (localStorage['authToken'] === '' && localStorage['user_id'] === '') {
    alert("Logging out!");
  }
}

function NavBar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-coolGrey mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <a
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
              href="#pablo"
            >
              Friends and Family with Borders
              </a>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <h1> <AiOutlineBars /></h1>
              <i aria-hidden="true"> </i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <NavLink to="/homePage">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Event Invitations</span>
                  </a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/createdEvents">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Created Events</span>
                  </a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/questionnaire">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Questionnaire</span>
                  </a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/profile">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2">Profile</span>
                  </a>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/">
                  <a
                    className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    href="#pablo"
                  >
                    <i className="text-lg leading-lg text-white opacity-75"></i><span className="ml-2" onClick={logout}>Log Out</span>
                  </a>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default withRouter(NavBar)