const express = require('express');
const router = express.Router();
const bcrypt =  require('bcryptjs');
const auth = require('../model/user');
const hash = require('../middleware/password_hash');
const authencate = require('../middleware/authenticated')
const {generateToken,verifyToken} = require('../services/tokenservice')

//middleware to hash the password



router.post('/signup',hash,(req,res)=>{

    try{

        auth.findOne({email:req.body.email},async (err,email)=>{
            if(err){
                res.send("the error message: "+err);
                res.end();
            }else{
                if(email){
                    res.json({error:`the eamil ${email.email} is already in use.`});
                }else{
                    const user = new auth({
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        age: req.body.age,
                        location: req.body.location,
                        domain: req.body.domain
                    });
                    const msg = await user.save();
                    res.json(msg);
                }
            }
        });        
    }catch{
        (err)=>{
            res.send("Error message :"+err);
        }
    }
})

router.post('/login',authencate,(req,res)=>{
    let username = req.name;
    let email = req.email;
    let age = req.age;
    let location = req.location;
    let domain = req.domain;
    
    const token = generateToken(username,email,age,location,domain);
    res.json({token:token,msg:"successfully logined and authenticated"});
    res.end();
   
})

router.get('/view',(req,res)=>{
    const document = verifyToken(req.body.token);
    if(document !== false){
            auth.findOne({email:document},(err,data)=>{
                if(data){
                    res.json({
                        email:data.email,
                        username:data.username,
                        age:data.age,
                        location:data.location,
                        domain:data.domain
                    })
                    res.end();
                }else{
                    res.json({"error":"user not found"});
                }
            })
    }else{

    }
    // if(document !== false){
    //     console.log("in view",document);
    //     res.json(document);
        
    // }else{
    //     res.json({error:"enter a valid jwt token"});
    // }

})



module.exports=router;