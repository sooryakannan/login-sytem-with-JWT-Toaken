    
const auth = require('../model/user');
const bcrypt = require('bcryptjs'); 
    
const authencate = (req,res,next)=>{
    const email = req.body.email;
    const password = req.body.password;
    try{
        // below function used to find that user enter email id is valid or not
      auth.findOne({email:email},(err,user)=>{
            //this error based on the mangoose 
            if(err){
                res.json({error:err})
                res.end()
            }else{
                // the user entered valid email then it execute
            if(user){
                
                bcrypt.compare(password,user.password,(err,result)=>{
                    // this error is based on the mangodb
                    if(err){
                        res.json({error:err});
                        res.end();
                    }
                    // if user entered valid password then it is consitered as authenticated
                    if(result === true){

                        req.name = user.username;
                        req.email = user.email;
                        req.age = user.age;
                        req.location = user.location;
                        req.domain = user.domain;
                        next();
                    }else{
                        res.json({msg:"the failed"})
                    }
                })
            }else{
                res.json({error:"please enter the valid email or signup"});
                res.end();
            }
            }
      
        })
     }catch{
        (err)=>{
            res.json({error:err});
        }
     }
    
}    
    

module.exports = authencate;