import React from "react";
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import OtherRadio from "../components/otherRadio";

export default function Modal({first, second, third, callBackLocation, callBackActivity, create, testDateTimes}) {
  const [showModal, setShowModal] = React.useState(false);
  const [location, setLocation] = React.useState(first);
  const [activity, setActivity] = React.useState("eat");
  const [otherActivites, setOtherActivites] = React.useState();
  

  const handleChange = (event) => {
    setLocation(event.target.value);  
    callBackLocation(event);
  };

  const handleLocation = (event) => {
    setActivity(event.target.value);  
    callBackActivity(event);
  };

  const handleOtherActivites = (event) => {
    setOtherActivites(event.target.value);  
  };

  const handleActivity = (event) => {
    create(event);
  };

  const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#CD8B76'
      },
    },
  });

  return (
    <>
      <button
        className="bg-coolBlue text-white active:bg-coolBlue font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => {
            if(testDateTimes()){
              //handleActivity();
              setShowModal(true);
            }
        }}
      >
        Generate Location
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                  <h3 className="text-3xl text-coolGrey-dark font-bold">
                    RECOMMENDATIONS
                  </h3>
                </div>
                {/*body*/}
                <div className="relative p-6 flex-auto text-left">
                    <FormControl component="fieldset">
                    <MuiThemeProvider theme={theme}>
                    <FormLabel component="legend">Location</FormLabel>
                        <RadioGroup aria-label="location" name="location1" value={location} onChange={handleChange}>
                            <FormControlLabel value={first} control={<Radio color="primary"/>} label={"1. "+first} />
                            <FormControlLabel value={second} control={<Radio color="primary"/>} label={"2. "+second} />
                            <FormControlLabel value={third} control={<Radio color="primary"/>} label={"3. "+third} />
                        </RadioGroup>
                        </MuiThemeProvider>
                    </FormControl>
                    
                </div>
                <div className="relative p-6 flex-auto text-left">
                    <FormControl component="fieldset">
                    <MuiThemeProvider theme={theme}>
                    <FormLabel component="legend">Activities</FormLabel>
                        <RadioGroup aria-label="location" name="location1" value={activity} onChange={handleLocation}>
                            <FormControlLabel value="eat" control={<Radio color="primary"/>} label={"1. eat"} />
                            <FormControlLabel value="physical activity" control={<Radio color="primary"/>} label={"2. physical activity"} />
                            <FormControlLabel value="general solcializing" control={<Radio color="primary"/>} label={"3. general solcializing"} />
                            <OtherRadio
                                control={<Radio color="primary"/>} 
                                onTextChange={handleOtherActivites}
                                value={otherActivites}
                                placeholder="other..."
                            />
                        </RadioGroup>
                        </MuiThemeProvider>
                    </FormControl>
                    
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-brightPink background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Go back
                  </button>
                  {/* <NavLink to="/createdEvents"> */}
                    <button
                        className="bg-coolBlue text-white active:bg-coolBlue font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                            setShowModal(false)
                            handleActivity()
                            }
                        }
                    >
                        Create Event
                    </button>
                  {/* </NavLink> */}
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}