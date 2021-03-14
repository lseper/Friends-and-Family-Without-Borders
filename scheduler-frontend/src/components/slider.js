import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 250,
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


const DiscreteSlider = ({userNumber, callBack}) => {
  const classes = useStyles();

  const [value, setValue] = React.useState(userNumber);

  // sets a new value and tests it by printing it to the console
  const handleChange = (event, newValue) => {
    setValue(newValue);
    callBack(newValue);
  };

  const marks = [
    {
      value: 2,
      label: 2,
    },
    {
      value: 4,
      label: 4,
    },
    {
      value: 6,
      label: 6,
    },
    {
        value: 8,
        label: 8,
      },
      {
        value: 10,
        label: 10,
      },
  ];

  return (
    <div className = "flex items-stretch static ">
        <div className = "px-4 flex items-start static ">
            <MuiThemeProvider theme={theme}>
            <div className={classes.root}>
            <Slider
                value={value}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-custom"
                valueLabelDisplay="auto"
                step={1}
                marks = {marks}
                min={1}
                max={10}
                // when Callback function that is fired when the mouseup is triggered.
                onChangeCommitted = {handleChange}
            />
            {/* <Typography className = "text-xs text-coolGrey-dark text-left" id="discrete-slider-custom" gutterBottom>
                Rate 1-10 (10 most comfortable) 
            </Typography> */}
            </div>
        </MuiThemeProvider>
        </div >
        <div className = "pb-12 px-2 flex items-end inline-block">
            <p className = "text-5xl text-coolGreen">{value}</p>
        </div>
    </div>
  );
}

export default DiscreteSlider;