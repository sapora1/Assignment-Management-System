import React from "react"
import  Axios  from "axios"

const Submit=(props)=>{
  console.log(props)
  const submit=()=>{
    Axios.post("http://localhost:3001/postanswer", {
            Answer: props.Answer,
            Student_id: props.Id,
            Ass_id: props.Ass_id,
        }).then((response) => {
            console.log(response)
            // window.location.reload();
        })
  }
    return(
        <button onClick={submit}>Submit</button>
    )
}

export default Submit;