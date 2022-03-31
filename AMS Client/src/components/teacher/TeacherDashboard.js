import * as React from 'react';
import "./DashboardStyle.css";
import { Grid } from "@material-ui/core"
import { ExitToApp } from "@material-ui/icons"
import { history } from '../../History';
import { useSelector } from 'react-redux';
import Axios from 'axios';
import { useEffect } from 'react';

export default function () {
    // const Teacher = useSelector((state) => (state.Teacher[0]));
    const [TeacherData, setTeacherData] = React.useState();
    const [TeacherName, setTeacherName] = React.useState();
    const pathname = window.location.pathname;
    const Id = pathname.split('/')[2]; console.log(Id)

    const logout = () => {
        history.push({
            pathname: `/`,
        });
    };

    useEffect(() => {
            console.log('fetch')
            Axios.post("http://localhost:3001/Teacher", {
                Id: Id
            }).then((response) => {
                console.log(response.data[0]);
                setTeacherData(response.data[0]);
                setTeacherName(response.data[0].Name);
            })
    }, []);

    const assigned =()=>{
        console.log("click")
        history.push({
            pathname: `/${Id}/assignment`,
        });
    }

    const submitted =()=>{
        history.push({
            pathname: `/${Id}/submissionsteacher`,
        });
    }

    const addass =()=>{
        history.push({
            pathname: `/${Id}/add`,
        });
    }

    return (
        <div className='student'>
            <div className='header'>
                <a onClick={logout}><ExitToApp style={{ float: 'right', margin: '10px', color: '#203e57', width: '50px', height: '50px' }} /></a>
                <h1 className='hello'>Hello, {TeacherName}</h1>
            </div>
            <Grid container direction='column' justifyContent='center'>
                {/* <Grid item justifyContent='center'>
                    <h2 className='hello'>Your Score is <br />89 out of 100</h2>
                    <h2 className='hello'>You have 5 Assigned Work</h2>
                </Grid> */}
                <Grid item justifyContent='center' style={{ textAlign: 'center' }}>
                    <button onClick={addass} className='dashboardbutton'>ADD Assignment</button>
                </Grid>
                <Grid item justifyContent='center' style={{ textAlign: 'center' }}>
                    <button onClick={assigned} className='dashboardbutton'>ASSIGNMENTS</button>
                </Grid>
                <Grid item justifyContent='center' style={{ textAlign: 'center' }}>
                    <button className='dashboardbutton' onClick={submitted}>SUBMITTED ASSIGNMENTS</button>
                </Grid>
            </Grid>
        </div>
    );
};
