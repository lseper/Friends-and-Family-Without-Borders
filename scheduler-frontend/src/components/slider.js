import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    width: 270,
  },
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8FD468"
    },
  },
});


const DiscreteSlider = ({ userNumber, callBack, maxPeople, marks }) => {
  const classes = useStyles();
  let [num, setValue] = React.useState(userNumber);
  num = userNumber;

  const handleChange = (event, newValue) => {
    setValue(newValue);
    callBack(newValue);
  };

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
              max={maxPeople}
              onChangeCommitted={handleChange}
            />
          </div>
        </MuiThemeProvider>
      </div >
    </div>
  );
}

export default DiscreteSlider;