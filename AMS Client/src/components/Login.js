import React, { useState } from 'react';
import './Login.css';
import { history } from '../History';
import Axios from 'axios';
import { useDispatch } from 'react-redux';


const Login = ()=> {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const dispatch = useDispatch();
  const login = () => {
    if (username === "admin@ams" && password === "root") {
      history.push({
        pathname: `/admindashboard`,
      });
    }
    else {
      Axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
      }).then((response) => {
        console.log(response.data[0])
        
        console.log(response.data)
        if (response.data.length === 0) {
          alert("Wrong Credidentials");
        }
        else if (response.data[0].Class) {
          dispatch({
            type: "LOAD_STUDENT",
            payload: response.data,
          })
          history.push({
            pathname: `/studentdashboard/${response.data[0].Student_id}`,
          });
        }
        else {
          history.push({
            pathname: `/teacherdashboard/${response.data[0].Id}`,
          });
        }
      })


    }
  };

  return (
    <>
      <div className="form">
        <div className="imgcontainer">
        </div>
        <div className="container" >
          {/* <label htmlFor="uname"><b>Username</b></label> */}
          <input type="email" placeholder="Enter Username" required onChange={(e) => {
            setusername(e.target.value);
          }} />
          {/* <label htmlFor="psw"><b>Password</b></label> */}
          <input type="password" placeholder="Enter Password" required onChange={(e) => {
            setpassword(e.target.value);
          }} />
          <div className="submit">
            <button onClick={login}>Login</button>
          </div>
          

          {/* <label style={{color:'white'}}>
            <input type="checkbox" defaultChecked="checked" name="remember" /> Remember me
          </label> */}
          {/* <div className="container1" > */}
          {/* <button type="button" className="cancelbtn">Cancel</button> */}

          {/* </div> */}
        </div>
      </div>
      {/* <span className="psw"><a href="#">Forgot password?</a></span> */}
    </>
  );
}

export default Login;