import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const useStyles = makeStyles({
    table: {
        width: '100%',
    },
});

export default function BasicTable({ users }) {
    const classes = useStyles();

    function convertToPercentage(num){
        return(Math.floor((num) * 100));
    }

    function createData() {
        let allUsers = []

        for(let i = 0; i < users.invitees.length; i++) {
            allUsers.push({ name: users.invitees[i].username, comfort: convertToPercentage(users.invitees[i].comfort_level), attendance: users.invitees[i].confirmed })
        }
        
        return allUsers;
    }

    

    const rows = createData()
 
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>UserName</TableCell>
                        <TableCell align="right">Comfort</TableCell>
                        <TableCell align="right">Attendance</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.name}
                            </TableCell>
                            <TableCell align="right"> {`${row.comfort}%`}</TableCell>
                            <TableCell align="right">{row.attendance ?
                                <div className="text-brightPink">
                                    <FontAwesomeIcon className="inline fa-lg mr-2 " icon={faCheckCircle} />
                                </div>
                                :
                                <div className="text-brightPink">
                                    <FontAwesomeIcon className="inline fa-lg mr-2 " icon={faTimesCircle} />
                                </div>
                            }</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}