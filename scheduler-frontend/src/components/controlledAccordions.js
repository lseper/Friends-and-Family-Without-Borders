import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CreateEventInviteesList from './createEventInviteesList';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
    color: '#454851'
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(20),
    color: "#454851",
  },
}));

export default function ControlledAccordions(invitees) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const users = [{ username: "mike", comfort: "very comfortable", attendance: true },
  // { username: "Em", comfort: "very comfortable", attendance: true },
  // { username: "Parker", comfort: "very comfortable", attendance: false }
  // ]

  const users = invitees;

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.secondaryHeading} variant="h4">Invitees</Typography>
        </AccordionSummary>
        <AccordionDetails className="w-full">
          <Typography className="w-full" component={'span'}>
            <div className="md:w-full">
              < CreateEventInviteesList
                users={users} />
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}