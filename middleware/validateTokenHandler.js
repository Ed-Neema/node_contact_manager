const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async(req,res, next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        // extract token
        token = authHeader.split(" ")[1];
        // verify token
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err,decoded)=>{
          if (err) {
            res.status(401);
            throw new Error("User is not Authorized");
          }
          // decoded payload of the token to the console
          //  The decoded object represents the information contained within the token after successful verification.
          console.log(decoded);
        //   set the req.user param using the decoded data
          req.user = decoded.user;
          next();
        } );
        if(!token){
            res.status(401);
            throw new Error("User not authorized or token missing")
        }
    }
})

module.exports = validateToken;