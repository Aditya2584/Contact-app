const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async(req, res, next) =>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        if(token){
            jwt.verify(token, process.env.ACCESS_TOKEN_SECERT, (err, decoded) =>{
                if(err){
                    res.status(401);
                    throw new Error("User is not authorized")
                }
                req.user = decoded.user;
                next();
            });
        } else {
            res.status(401);
            throw new Error("User is not authorized or the token is missing in the request")
        }
    } else {
        res.status(401);
        throw new Error("User is not authorized or the token is missing in the request")
    }
})

module.exports = validateToken; 