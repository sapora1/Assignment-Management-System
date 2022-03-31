import React, { useState } from "react"
import  Axios  from "axios"
import { TextField } from "@material-ui/core"

const Addass=()=>{
  const submit=()=>{
    console.log("submitted")
    Axios.post("http://localhost:3001/addassignment", {
            Subject_code: Subject_code,
            Question:Question,
            Deadline: Deadline,
            Class: Class,
            Assignment_id: Assignment_id,
        }).then((response) => {
            console.log()
            // window.location.reload();
        })
  }
  const [Assignment_id,setAssignment_id]=useState();
  const [Class,setClass]=useState();
  const [Deadline,setDeadline]=useState();
  const [Question,setQuestion]=useState();
  const [Subject_code,setSubjectcode]=useState();
    return(
        <div style={{padding:'100px',margin:'100px',background:'#498EC5'}}>
        Assignment_id<TextField label="int" fullWidth onChange={(e) => {
            setAssignment_id(e.target.value);
        }}></TextField><br/><br/>
        Question<TextField label="Drive link" fullWidth onChange={(e) => {
            setQuestion(e.target.value);
        }}></TextField><br/><br/>
        Deadline<TextField label="yyyy-mm-dd" fullWidth onChange={(e) => {
            setDeadline(e.target.value);
        }}></TextField><br/><br/>
        Class<TextField label="string" fullWidth onChange={(e) => {
            setClass(e.target.value);
        }}></TextField><br/><br/>
        Sub_code<TextField label="string" fullWidth onChange={(e) => {
            setSubjectcode(e.target.value);
        }}></TextField><br/><br/>
        <button style={{border:"2px solid black"}} onClick={submit}>Submit</button>
        </div>
    )
}

export default Addass;