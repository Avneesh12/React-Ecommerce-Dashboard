import React, { useState,useEffect } from 'react';
import "./login.css";
import { useNavigate } from 'react-router-dom';


const Login= () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem("user");
        if (auth){
            navigate('/');
        }
    },[navigate])

    const handleSubmit = async (e) =>{
        e.preventDefault();
        let result = await fetch("http://localhost:5000/login",{
            method:"post",
            body:JSON.stringify({email,password}),
            headers:{"Content-Type":"application/json"}
        })
        result = await result.json();
        console.log(result);        
        if(result.auth){
            localStorage.setItem("token",JSON.stringify(result.auth));
            localStorage.setItem("user",JSON.stringify(result.user));
            navigate("/");
        }else{
            alert("Not Valid User");
        }
        
    }


  return (
    <div className='register-container'>
        <div className="myform">
            <h2 className='regtext'>User Login Form</h2>
            <hr />
            <form action="" onSubmit={handleSubmit}>
                <div className="inp">
                    <input type="email" name="uemail"  placeholder='Enter Your Email' onChange={(e)=>{setEmail(e.target.value)}} />
                </div>
                <div className="inp">
                    <input type="password" name="upass"  placeholder='Enter Your Password' onChange={(e)=>{setPassword(e.target.value)}}/>
                </div>  
                <div className="mybtn">
                    <button>Submit</button>
                </div>              
            </form>
        </div>
    </div>
  )
}

export default Login