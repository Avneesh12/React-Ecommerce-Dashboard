import React from "react";
import { useState, useEffect } from "react";
import "./product.css";
import { NavLink } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);
  const getProduct = async () => {
    let result = await fetch("http://localhost:5000/products",{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      }
    });
    result = await result.json();
    setProducts(result);
  };
  
  const deleteProduct = async (id) =>{
    let result = await fetch(`http://localhost:5000/delete-product/${id}`,{
      headers:{
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
      },
      method:"delete"
      
    })
    await result.json()
    getProduct();
  }

  const searchProduct = async (e) =>{
    let key = e.target.value;
    if(key){
      let result = await fetch(`http://localhost:5000/search/${key}`,{
        headers:{
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`
        }
      });
      result = await result.json()
      setProducts(result);
      }else{
        getProduct();
      }
  }


  return (
    <div className="productContainer">
      <div className="tablediv">
      <h1>Your Products Details</h1>
      <input type="search" name="searchproduct" id="searchinp" className="searchinp"
       placeholder="Search Your Products" onChange={searchProduct} />
      <hr/>
      {products.length > 0 ? 
        <table  cellPadding={10} border={5}>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Catagory</th>
              <th>Company</th>
              <th>Operation</th>
            </tr>
          </thead>
          
          <tbody>
            {products.map((item,index)=>(
              <tr key={index}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td>$ {item.price}</td>
                <td>{item.catagory}</td>
                <td>{item.company}</td>
                <td><button onClick={()=>deleteProduct(item._id)} className="deletebtn">Delete</button>
                <button className="updatelink"><NavLink to={"/update/"+item._id} className="updatenavlink" >Update</NavLink></button>
                </td> 
              </tr>
            ))}
          </tbody>
        </table>
        : <h1>Result Not Found</h1>}
      </div>
    </div>
  );
};

export default Product;
