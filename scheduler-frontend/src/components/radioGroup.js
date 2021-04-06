import React, { Component } from "react";
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
const SearchSelect = ({ value, control, label }) => {

    //const [invitee, setInvitees] = useState([]);

    // const handleSelectChange = (event) => {
    //     setInvitees(event)
    //     handleCallback(event);
    // }

    return (
        <div>
        {/* <FormControl component="fieldset">
        <MuiThemeProvider theme={this.theme}>
        <FormLabel component="legend">Location</FormLabel>
            <RadioGroup aria-label="location" name="location1" value={this.state.location} onChange={this.handleChange}>



                <FormControlLabel value={first} control={<Radio color="primary"/>} label={"1. "+first} /> */}
                <FormControlLabel value={value} control={<Radio color="primary"/>} label={"2. "+"second"} />
                {/* <FormControlLabel value={third} control={<Radio color="primary"/>} label={"3. "+third} />

              {this.state.locationList}
              
                
            </RadioGroup>
            </MuiThemeProvider>
        </FormControl> */}
        
    </div>
    )
}


export default SearchSelect;