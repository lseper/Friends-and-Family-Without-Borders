import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 240,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#BDE4A7"
    },
  },
});


const DiscreteSlider = ({ userNumber, callBack }) => {
  const classes = useStyles();


  let [num, setValue] = React.useState(userNumber);
  num = userNumber;

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
    <div className="flex items-stretch static ">
      <div className=" flex items-start static ">
        <MuiThemeProvider theme={theme}>
          <div className={classes.root}>
            <Slider
              value={num}
              aria-labelledby="discrete-slider-custom"
              valueLabelDisplay="auto"
              step={1}
              marks={marks}
              min={1}
              max={10}
              onChangeCommitted={handleChange}
            />
          </div>
        </MuiThemeProvider>
      </div >
      <div className="pb-3 px-6 flex items-end inline-block">
        <p className="text-4xl text-coolGreen">{num}</p>
      </div>
    </div>
  );
}

export default DiscreteSlider;