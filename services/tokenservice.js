const jwt = require('jsonwebtoken');
const auth = require('../model/user');

// this function is used to generate JWT toaken
const generateToken = (username, email, age, location, domain) => {
    const payload = {
        user: username,
        email: email,
        age: age,
        location: location,
        domain: domain
    };
    //this statement return the JWT toaken
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET,{expiresIn: 60});
}


//this function is used to verify the JWT toaken
const verifyToken = (token, callback) => {
    //this function is jwt verify function and verify it
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
        // if the toaken is wrong then it makes error and return false to callback function
        if (err) { return callback(false) }
        //this statement verify if the toaken is correct if it has payload
        if (payload) {
            //this statement return user mail id to callback function
            return callback(payload.email);
        } else {
            //this statement return false to callback function if the payload is does not exist
            return callback(false);
        }

    });
}
  
    



module.exports = {generateToken,verifyToken};