import React from 'react';
import "./addProduct.css";
import { useState } from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import {useNavigate} from "react-router-dom"

const AddProduct = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [catagory,setCatagory] = useState("");
    const [company,setCompany] = useState("");
    const [error,setError] = useState(false);
    const navigate = useNavigate()
    

    const getProduct = async (e)=>{
        e.preventDefault();
        if (!name || !price || !catagory || !company){
            console.log("Fill the Field");
            setError(true)
            return false
        }
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        await fetch("http://localhost:5000/add-product",{
            method:"post",
            body:JSON.stringify({name,price,catagory,userId,company}),
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        })
        navigate("/")
        
    }
  
    return (
        <div className='register-container'>
            <div className="myform">
                <h2 className='regtext'>Add Your Product</h2>
                <hr />
                <form action="" onSubmit={getProduct}>
                    <div className="inp">
                        <input type="text" name="name"  placeholder='Product Name' value={name}
                        onChange={(e)=>setName(e.target.value)}  />
                        {error && !name && <span className='errorIcon'><ReportProblemIcon /></span>}
                    </div>
                    <div className="inp">
                        <input type="text" name="price"  placeholder='Price' value={price}
                        onChange={(e)=>setPrice(e.target.value)} />
                        {error && !price && <span className='errorIcon'><ReportProblemIcon /></span>}
                    </div>
                    <div className="inp">
                        <input type="text" name="catagory"  placeholder='Product Catagory' value={catagory}
                        onChange={(e)=>setCatagory(e.target.value)} />
                        {error && !catagory && <span className='errorIcon'><ReportProblemIcon /></span>}
                    </div>
                    <div className="inp">
                        <input type="text" name="campany"  placeholder='Company Name' value={company}
                        onChange={(e)=>setCompany(e.target.value)} />
                        {error && !company && <span className='errorIcon'><ReportProblemIcon /></span>}
                    </div>  
                    <div className="mybtn">
                        <button>Add Product</button>
                    </div>              
                </form>
            </div>
        </div>
      )
}

export default AddProduct