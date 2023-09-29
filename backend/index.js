const express = require("express");
require("./db/config");
const User = require("./db/User");
const cors = require("cors");
const app = express();
const Product = require("./db/Product");

const jwt = require("jsonwebtoken");
const jwtkey = "e-comm";

app.use(express.json());
app.use(cors());


const verifyToken = (req,res,next)=>{
    let token = req.headers['authorization']
    if(token){
        token = token.split(" ")[1]
        jwt.verify(token,jwtkey,(err,valid)=>{
            if(err){
                res.status(401).send({result:"PLease Provide Valid Token ..!!"})
            }else{
                next()
            }
        })
    }else{
        res.status(403).send({result:"Please Provide Token in Header"})
    }
}

app.post("/register", async (req,res)=>{
    const data = req.body;
    const user = new User(data);
    let result = await user.save();
    result = result.toObject();
    delete result.password;
    if(result){
        jwt.sign({result},jwtkey,{expiresIn:"2h"},(err,token)=>{
            if(err){
                res.status(401).send({result:"Something went wrong"});
            }
            res.send({result,auth:token});
        })
    }else{
        res.status(403).send({result:"Something Went Wrong"})
    }
})


app.post("/login", async (req,res)=>{
    if(req.body.email && req.body.password){
        const user = await User.findOne(req.body).select("-password");
        if(user){
            jwt.sign({user},jwtkey,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({result:"Something went wrong"});
                }
                res.send({user,auth:token});
            })
        }else{
            res.send({result:"User not Found"})
        }
        
    }else{
        res.send({result:"Not a Valid User"});
    }
    
})

app.post("/add-product",verifyToken, async (req,res)=>{
    const product = new Product(req.body);
    let result = await product.save();
    res.send(result);

})


app.get("/products",verifyToken, async (req,res)=>{
    const product = await Product.find();
    if(product.length > 0){
        res.send(product);
    }else{
        res.send({result:"No Product Found"});
    }
})

app.get("/product/:id",verifyToken, async (req,res)=>{
    let result = await Product.findOne({_id:req.params.id})
    if(result){
        res.send(result);
    }else{
        res.send({result:"No Product Found"});
    }
          
})


app.delete("/delete-product/:id",verifyToken,async (req,res)=>{
    const id = req.params.id;
    const result = await Product.deleteOne({_id:id});
    res.send(result);
})


app.put("/update-product/:id",verifyToken,async (req,res)=>{
    let result = await Product.updateOne(
        {_id:req.params.id},
        {
            $set:req.body
        }
    )
    res.send(result);
})


app.get("/search/:key",verifyToken,async (req,res)=>{
    let result = await Product.find({
        "$or":[
            {name:{$regex:req.params.key}},
            {catagory:{$regex:req.params.key}},
            {company:{$regex:req.params.key}}
        ]
    });
    res.send(result)
})





app.listen(5000);