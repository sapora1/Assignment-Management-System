import * as React from 'react';
import "./DashboardStyle.css";
import { Button, Grid, TextField } from "@material-ui/core"
import { ExitToApp, KeyboardArrowLeft } from "@material-ui/icons"
import { history } from '../../History';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Submit from './Submit';

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});


export default function () {
    const classes = useStyles();
    const student = useSelector((state) => (state.student[0]));
    const [studentData, setStudentData] = React.useState();
    const [AssignmentData, setAssignmentData] = React.useState([]);
    const [studentName, setStudentName] = React.useState();
    const [Answer, setAnswer] = React.useState();
    const pathname = window.location.pathname;
    const Id = pathname.split('/')[1]; console.log(Id)

    const logout = () => {
        history.push({
            pathname: `/`,
        });
    };

    useEffect(() => {
        if (!student) {
            console.log('fetch')
            Axios.post("http://localhost:3001/student", {
                Student_id: Id
            }).then((response) => {
                console.log(response.data[0]);
                setStudentData(response.data[0]);
                setStudentName(response.data[0].Name);
            })
        }
        else {
            setStudentData(student[0]);
            setStudentName(student[0].Name);
        }
    }, []);

    useEffect(() => {
        Axios.post("http://localhost:3001/assigned", {
            Student_id: Id
        }).then((response) => {
            console.log("Assignment", response.data);
            setAssignmentData(response.data);
        })
    }, []);

    const back = () => {
        history.push({
            pathname: `/studentdashboard/${Id}`,
        });
    }

    const handlechange = (e) => {
        setAnswer(e.target.value);
    };

    const submitted = () => {
        history.push({
            pathname: `/${Id}/submitted`,
        });
    };

    const submit = (e) => {
        // const data="{'main':'[data:application/pdf;base64,"+Answer+"]'}";
        // const compressedString = cjson.compress.toString({Answer})
        // console.log(compressedString)
        console.log("e",e)
        if(e){
        Axios.post("http://localhost:3001/postanswer", {
            Answer: Answer,
            Student_id: Id,
            Ass_id: e,
        }).then((response) => {
            console.log(response)
            // window.location.reload();
        })}
    };
    console.log("ans",Answer)
    return (
        <div className='student'>
            <div className='header'>
                <a onClick={logout}><ExitToApp style={{ float: 'right', margin: '10px', color: '#203e57', width: '50px', height: '50px' }} /></a>
                <h1 className='hello'>Hello, Student</h1>
            </div>
            <Grid container direction='column' justifyContent='center'>
                {/* <Grid item justifyContent='center'>
                    <h2 className='hello'>Your Score is <br />89 out of 100</h2>
                    <h2 className='hello'>You have 5 Assigned Work</h2>
                </Grid> */}

                <Grid item justifyContent='center' style={{ textAlign: 'center' }}>

                    <Card style={{ backgroundColor: "#B6D1DE", margin: '10px 30px 10px 30px' }} elevation={10} >
                        <CardContent>
                            <a onClick={back} style={{ float: 'left', padding: '2px', borderRadius: '30px', width: '70px', boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.3)', height: '30px', alignItems: 'center', background: '#498EC5', color: '#203e57' }}>
                                <KeyboardArrowLeft style={{ width: '30px', height: '30px' }} />
                            </a>
                            <Typography gutterBottom variant="h5" component="div">
                                Assignments
                            </Typography>
                            <Typography variant="body2" >
                                These are the list of assignments you need to submit
                            </Typography>
                        </CardContent>
                        <CardContent  >
                            {/* {AssignmentData.map(data => <h2>{data.Question}</h2>)} */}
                            <TableContainer component={Paper}>
                                <Table className={classes.table} aria-label="customized table">
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell align="right">Assignment ID</StyledTableCell>
                                            <StyledTableCell align="right">Subject Code</StyledTableCell>
                                            <StyledTableCell align="right">Class</StyledTableCell>
                                            <StyledTableCell align="right">Question</StyledTableCell>
                                            <StyledTableCell align="right">Deadline</StyledTableCell>
                                            <StyledTableCell align="right">Answer Drive Link</StyledTableCell>
                                            <StyledTableCell align="right">Submit</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {AssignmentData.map((row) => (
                                            <StyledTableRow key={row.name}>
                                                {/* <StyledTableCell component="th" scope="row">
                                                    {row.name}
                                                </StyledTableCell> */}
                                                <StyledTableCell align="right">{row.Assignment_id}</StyledTableCell>
                                                <StyledTableCell align="right">{row.Subject_code}</StyledTableCell>
                                                <StyledTableCell align="right">{row.Class}</StyledTableCell>
                                                <StyledTableCell align="right" style={{ maxWidth: '40px', overflowX: 'auto' }}><a href={row.Question} target="_blank">View</a></StyledTableCell>
                                                <StyledTableCell align="right">{row.deadline}</StyledTableCell>
                                                <StyledTableCell align="right"><TextField onChange={(e) => {
                                                    setAnswer(e.target.value);
                                                }}></TextField></StyledTableCell>
                                                <StyledTableCell align="right"><Submit Ass_id={row.Assignment_id} Answer={Answer} Id={Id}/></StyledTableCell>
                                            </StyledTableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item justifyContent='center' style={{ textAlign: 'center' }}>
                    <button className='dashboardbutton' onClick={submitted}>SUBMITTED</button>
                </Grid>
            </Grid>
        </div>
    );
};
