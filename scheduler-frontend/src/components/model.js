// import React, { Component } from "react";
// import FormLabel from '@material-ui/core/FormLabel';
// import Radio from '@material-ui/core/Radio';
// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormControl from '@material-ui/core/FormControl';
// import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import PopOver from '../components/popOver';

// const ShowLocationSuggestions = ({ value, number, activity, id, avgComfort, comfortableAttendees, comfortablePriority}) => {
//     return (
//       <div>
//               <FormControlLabel 
//               //value={value + " - " + activity} 
//               value = {id}
//               control={<Radio color="primary"/>} 
//               //label={value + " - " + activity + " comfort: " + avgComfort + " Comfortable Invitees " + comfortableAttendees + " Comfortable Priority " + comfortablePriority } />
//               label={value + " - " + activity } />
//       </div>
//   )
// }

// export class Modal extends Component {
//   constructor(props) {
//     super(props);
//       this.state = {
//         showModal: false,
//         location: '',
//         locationList: [],
//         wait: true,
//         locationInfo: this.props.locationInfo,
//         firstRecommendation: [],
//         secondRecommendation:[] ,
//         thirdRecommendation: [] 
//       };
//   }

//   handleChange = (event) => {
//     this.setState({
//       location: event.target.value
//     });
//     console.log(event.target.value);
//     this.props.callBackLocation(event);
//   };

//   handleActivity = (event) => {
//     this.props.create(event);
//   };

//   showLocations() {
//     console.log("Hitting here");

//     this.setState({
//       locationList: this.props.locationInfo.map(location => {
//           return (<ShowLocationSuggestions
//               value={location.location.location_type}
//               activity={location.activity.name}
//               key={location.location.location_type + '' + location.activity.name}
//               id = {location.id}
//               avgComfort = {location.average_comfort}
//               comfortableAttendees = {location.others_passed}
//               comfortablePriority = {location.priority_passed}

//           />)
//       }
//       ),
//   })
//     console.log(this.props.locationList)
//     return(true);
//   }

//   theme = createMuiTheme({
//     palette: {
//       primary: {
//         main: '#CD8B76'
//       },
//     },
//   });

//   render() {

  
//     return (
//       <>
//         <button
//           className="bg-coolBlue text-white active:bg-coolBlue font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//           type="button"
//           onClick={() => {
//               //this.handleActivity();
              
//               if(this.props.testDateTimes() && this.showLocations()){
//                 //this.handleActivity();
//                 console.log(this.props.locationInfo)
//                 this.setState({
//                   showModal: true
//                 })
//               }
//           }}
//         >
//           View Location Suggestions
//         </button>
//         {this.state.showModal ? (
//           <>
//             <div
//               className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
//             >
//               <div className="relative w-auto my-6 mx-auto max-w-3xl">
//                 {/*content*/}
//                 <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
//                   {/*header*/}
//                   <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
//                     <h3 className="text-3xl text-coolGrey-dark font-bold">
//                       RECOMMENDATIONS
//                     </h3>
//                   </div>
//                   {/*body*/}
//                   <div className="relative p-6 flex-auto text-left">
//                       <FormControl component="fieldset">
//                       <MuiThemeProvider theme={this.theme}>
//                       <FormLabel component="legend">Location-Activity</FormLabel>
//                           <RadioGroup aria-label="location" name="location1" value={this.state.location} onChange={this.handleChange}>
//                             {this.state.locationList}  
//                           </RadioGroup>
//                           </MuiThemeProvider>
//                       </FormControl>
                      
//                   </div>
//                   {/*footer*/}
//                   <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
//                     <button
//                       className="text-brightPink background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                       type="button"
//                       onClick={() =>
//                         this.setState({
//                           showModal: false
//                         })}
//                     >
//                       Go back
//                     </button>
//                     {/* <NavLink to="/createdEvents"> */}
//                       <button
//                           className="bg-coolBlue text-white active:bg-coolBlue font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
//                           type="button"
//                           onClick={() => {
//                             this.props.addEventLocation();
//                               this.setState({
//                                 showModal: false
//                               })
//                               }
//                           }
//                       >
//                           Create Event
//                       </button>
//                     {/* </NavLink> */}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
//           </>
//         ) : null}
//       </>
//     );
//   }
// }

// export default Modal;