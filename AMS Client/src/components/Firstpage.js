import { Grid } from '@material-ui/core';
import React from 'react';
import Login from './Login';
import './Login.css';
import Title from './Title';

export default function(){
    console.log("firstpage")
    return(
        <div className='background'>
        <Grid container justifyContent='space-around' className='wholeblack'>
          <Grid item justifyContent='center'>  
            <Login/>
            <form/>
            
            </Grid>
            <Grid item justifyContent='center'>
            <Title/>
            </Grid>
            
        </Grid>
        </div>
    )
};