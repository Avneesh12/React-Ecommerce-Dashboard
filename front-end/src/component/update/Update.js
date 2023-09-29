import React from 'react';
import "./update.css";
import { useState ,useEffect } from 'react';
import {useParams ,useNavigate } from "react-router-dom";

const Update = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [catagory,setCatagory] = useState("");
    const [company,setCompany] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    let updateurl = `http://localhost:5000/product/${params.id}`

    useEffect(()=>{
        getProductDetail(updateurl)
        console.log("This is Update")
    },[updateurl])

    const getProductDetail = async (update_url) =>{
        let result = await fetch(update_url,{
            headers:{
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
            }
        });
        result = await result.json()
        setName(result.name);
        setPrice(result.price);
        setCatagory(result.catagory);
        setCompany(result.company)
    }

    const updateProduct = async(e) =>{
        e.preventDefault();
        await fetch(`http://localhost:5000/update-product/${params.id}`,{
            method:"put",
            body:JSON.stringify({name,price,catagory,company}),
            headers:{
                "Content-Type":"application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        },
        })
        navigate("/");
        
    }
    

  
    return (
        <div className='register-container'>
            <div className="myform">
                <h2 className='regtext'>Update Your Product</h2>
                <hr />
                <form action="" onSubmit={updateProduct} >
                    <div className="inp">
                        <input type="text" name="name"  placeholder='Product Name' value={name}
                        onChange={(e)=>setName(e.target.value)}  />
                    </div>
                    <div className="inp">
                        <input type="text" name="price"  placeholder='Price' value={price}
                        onChange={(e)=>setPrice(e.target.value)} />
                    </div>
                    <div className="inp">
                        <input type="text" name="catagory"  placeholder='Product Catagory' value={catagory}
                        onChange={(e)=>setCatagory(e.target.value)} />
                    </div>
                    <div className="inp">
                        <input type="text" name="campany"  placeholder='Company Name' value={company}
                        onChange={(e)=>setCompany(e.target.value)} />
                    </div>  
                    <div className="mybtn">
                        <button>Update Product</button>
                    </div>              
                </form>
            </div>
        </div>
      )
}

export default Update