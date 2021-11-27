const User = require('../models/user');


// returns list of elements
exports.get_users = async (request, response,next)  =>{
    try {
       console.log("in all categories")
       const users = await User.findAll({where: {
        role: "user",
      },
    });
       if (users) {
        response.json({ users });
       } else {
        response.status(500);
       }
    } catch (error) {
        next(error)
    }
}

// returns element
exports.get_user = async (request, response,next)  =>{
  try {
     const user_id = request.params.id;
     const users = await User.findAll({
      attributes: ["username", "email","role","status"],
      where: {
        id: user_id,
    },
  });
     if (users) {
      response.json({ users });
     } else {
      response.status(500);
     }
  } catch (error) {
      next(error)
  }
}

exports.update_user = async (request, response,next)  =>{
  try {
     const user_id = request.params.id;
     const users = await User.update(request.body, {
      where: {
        id: user_id,
      },
    });
     if (users) {
      response.json({ users });
     } else {
      response.status(500);
     }
  } catch (error) {
      next(error)
  }
}

exports.disable_user = async (request, response,next)  =>{
  try {
     const user_id = request.params.id;
     const users = await User.update({
      status:'blocked'
    }, {
      where: {
        id: user_id,
      },
    });
     if (users) {
      response.json({ users });
     } else {
      response.status(500);
     }
  } catch (error) {
      next(error)
  }
}



  
