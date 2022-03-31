import * as React from 'react';
import "./DashboardStyle.css";
import { Grid } from "@material-ui/core"
import { ExitToApp } from "@material-ui/icons"
import { history } from '../../History';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { useEffect } from 'react';

export default function () {
    const student = useSelector((state) => (state.student[0]));
    const [studentData, setStudentData] = React.useState();
    const [studentName, setStudentName] = React.useState();
    const pathname = window.location.pathname;
    const Id = pathname.split('/')[2]; console.log(Id)

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

    const assigned =()=>{
        console.log("click")
        history.push({
            pathname: `/${Id}/assigned`,
        });
    }

    const submitted =()=>{
        history.push({
            pathname: `/${Id}/submitted`,
        });
    }

    return (
        <div className='student'>
            <div className='header'>
                <a onClick={logout}><ExitToApp style={{ float: 'right', margin: '10px', color: '#203e57', width: '50px', height: '50px' }} /></a>
                <h1 className='hello'>Hello, Student</h1>
            </div>
            <Grid container direction='column' justifyContent='center'>
                <Grid item justifyContent='center'>
                    <h2 className='hello'>Your Assigned Works are here</h2>
                </Grid>
                <Grid item justifyContent='center' style={{ textAlign: 'center' }}>
                    <button onClick={assigned} className='dashboardbutton'>ASSIGNED</button>
                </Grid>
                <Grid item justifyContent='center' style={{ textAlign: 'center' }}>
                    <button className='dashboardbutton' onClick={submitted}>SUBMITTED</button>
                </Grid>
            </Grid>
        </div>
    );
};
