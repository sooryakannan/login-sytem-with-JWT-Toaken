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
    if(payload){
        return payload.email;
    }else{
        return false;
    }
    
}


module.exports = {generateToken,verifyToken};