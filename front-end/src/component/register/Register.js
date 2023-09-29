import React from 'react';
import "./register.css";
import { useState ,useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if (auth){
            navigate('/');
        }
    },[navigate])


    const getData = async (e)=>{
        e.preventDefault();
        console.log(name,email,password);
        let result = await fetch("http://localhost:5000/register",{
            method:"post",
            body:JSON.stringify({name,email,password}),
            headers:{"Content-Type":"application/json"}
        })
        result = await result.json();
        localStorage.setItem("token",JSON.stringify(result.auth));
        localStorage.setItem("user",JSON.stringify(result.result));
        navigate("/");

    }

  return (
    <div className='register-container'>
        <div className="myform">
            <h2 className='regtext'>User Registration Form</h2>
            <hr />
            <form action="" onSubmit={getData}>
                <div className="inp">
                    <input type="text" name="uname"  placeholder='Enter Your Name' value={name} onChange={(e)=>{setName(e.target.value)}} />
                </div>
                <div className="inp">
                    <input type="email" name="uemail"  placeholder='Enter Your Email'  value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <div className="inp">
                    <input type="password" name="upassword"  placeholder='Enter Your Password'  value={password} onChange={(e)=>{setPassword(e.target.value)}}  />
                </div>  
                <div className="mybtn">
                    <button>Submit</button>
                </div>              
            </form>
        </div>
    </div>
  )
}

export default Register