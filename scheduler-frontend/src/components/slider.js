import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

//to reset the color for the built in slider
const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#BDE4A7"
      },
    },
  });

function valuetext(value) {
  return `${value}°C`;
}

export default function DiscreteSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState(30);

  // sets a new value and tests it by printing it to the console
  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <MuiThemeProvider theme={theme}>
    <div className={classes.root}>
      <Typography className = "text-sm text-coolGrey-dark" id="discrete-slider" gutterBottom>
        1 is least comfortable and 10 is most comfortable 
      </Typography>
      <Slider
        value={value}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider"
        valueLabelDisplay="auto"
        step={1}
        marks
        min={1}
        max={10}
        // when Callback function that is fired when the mouseup is triggered.
        onChangeCommitted = {handleChange}
      />
    </div>
    </MuiThemeProvider>
  );
}