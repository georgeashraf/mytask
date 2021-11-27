const jwt = require('jsonwebtoken');
const SECRET = 'myjwtsecret0';

async function verify (request,response,next){
    const token = request.header('Authorization');
    if(!token){
       return response.status(401).json('Access Denied');   
    }
    try{
        const payload = jwt.verify(token,SECRET);
        request.user = payload;
        next();
    } catch(err){
         response.status(400).json('invalid token');
    }
};
module.exports = verify