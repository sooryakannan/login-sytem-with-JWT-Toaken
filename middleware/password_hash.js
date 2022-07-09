const bcrypt = require('bcryptjs');
const hash_pass = (req,res,next)=>{
    
    const password = req.body.password;
    bcrypt.genSalt(10,(err,salt)=>{
        if(err){res.json({error:err});}
        bcrypt.hash(password,salt,(err,hash)=>{
            if(err){res.json({error:err})}
            req.body.password=hash;
            next();
        })
    });
   
}


module.exports = hash_pass;