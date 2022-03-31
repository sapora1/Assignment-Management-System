import React from "react"
import  Axios  from "axios"

const Marks=(props)=>{
  console.log(props)
  const submit=()=>{
    Axios.post("http://localhost:3001/marks", {
            marks: props.Marks,
            Submission_id: props.Id,
            Assignment_id: props.Assignment_id,
        }).then((response) => {
            console.log(response)
            // window.location.reload();
        })
  }
    return(
        <button onClick={submit}>Submit</button>
    )
}

export default Marks;