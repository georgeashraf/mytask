const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SECRET = 'myjwtsecret0';
// returns created element

exports.register = async (request, response,next)  =>{
     try {
        const email = request.body.email
        const checkmail = await User.findAll({
            attributes: ['id'],
            where :{
                email:email
            }
        });
        if(checkmail ==[])  return response.status(400).json({msg:"Email already exists"});
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(request.body.password, salt);
        request.body.password = hashPassword
        const user = await User.create(
            request.body
        );
        if (user) {
         response.json({ user });
        } else {
         response.status(500);
        }
     } catch (error) {
         next(error)
     }
 
}

exports.login = async (request, response,next)  =>{
    // check for blocked
    try {
       const email = request.body.email
       const user = await User.findAll({
           where :{
               email: email
           }
       });
       console.log(user)
       if (user[0].status =='blocked') return response.status(400).json({msg:"This user is blocked"});
       if(user ==[])   response.status(400).json({msg:"Email or password incorect"});

       const validPass = await bcrypt.compare(request.body.password, user[0].password);
       if(!validPass)  response.status(400).json({msg:"Email or password is incorrect"});
       
       const token = jwt.sign({ id: user.id }, SECRET);
       if (!token)  response.status(400).json({ msg: 'login error please try again' });
     

        response.status(200).json({token:token,role:user[0].role});

       

    } catch (error) {
        next(error)
    }
}