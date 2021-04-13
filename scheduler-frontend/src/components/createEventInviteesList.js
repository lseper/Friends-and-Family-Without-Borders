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

    function createData(name, comfort, attendance) {
        console.log("Users")
        console.log(users.invitees);

        let allUsers = []

        for(let i = 0; i < users.invitees.length; i++) {
            console.log(users.invitees[i].username);
            allUsers.push({ name: users.invitees[i].username, comfort: users.invitees[i].comfort_level, attendance: users.invitees[i].confirmed })
        }
        
        return allUsers;
    }

    // const rows = [
    //     createData(users[0].username, users[0].comfort, users[0].attendance),
    //     createData(users[1].username, users[1].comfort, users[1].attendance),
    //     createData(users[2].username, users[2].comfort, users[2].attendance),
    // ];
    const rows = createData(users)

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
                            <TableCell align="right"> {row.comfort}</TableCell>
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