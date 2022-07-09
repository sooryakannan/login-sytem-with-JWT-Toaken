const jwt = require('jsonwebtoken');
const auth = require('../model/user');

const generateToken = (username,email,age,location,domain)=>{
    const payload = {
        user:username,
        email:email,
        age:age,
        location:location,
        domain:domain
    };
    return jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET);
}



const verifyToken =  (token)=>{
    const payload = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    auth.findOne({email:payload.email},(err,data)=>{
        if(err){
            throw new Error("cant find");
        }
        if(data){
            console.log("the data is " + data);
            return {username:data.username};
        }else{
            return false;
        }
    });
   

}


module.exports = {generateToken,verifyToken};