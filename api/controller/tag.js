const Tag = require("../models/tag");

// returns created element
exports.create_tag = async (request, response, next) => {
  try {
      const tags_arr = request.body.tags
      for (let element of tags_arr) {
        const tag = await Tag.create({
            name: element.name,
          });
      }
    // if (tag) {
      response.json({ tags_arr });
    // } else {
    //   response.status(500);
    // }
  } catch (error) {
    next(error);
  }
};

// returns list of elements
exports.get_tags = async (request, response,next)  =>{
  try {
     const tags = await Tag.findAll({
      attributes: ['id','name'],
    });
     if (tags) {
      response.json({ tags });
     } else {
      response.status(500);
     }
  } catch (error) {
      next(error)
  }
}

exports.delete_tag = async (request, response,next)  =>{
  try {
     const tag_id = request.params.id
     const tag = await Tag.destroy({
      where: {
        id: tag_id
      }
    });
     if (tag) {
      response.json({ tag });
     } else {
      response.json({"msg":'No category found..perhaps it was already deleted'}).status(404)
     }
  } catch (error) {
      next(error)
  }
}

exports.update_tag = async (request, response,next)  =>{
  try {
     const tag_id = request.params.id
     const tag = await Tag.update(request.body, {
      where: {
        id: tag_id
      }
    });
     if (tag) {
      response.json({ tag });
     } else {
      response.json({"msg":'No category found..perhaps it was already deleted'}).status(404)
     }
  } catch (error) {
      next(error)
  }
}

// returns element
exports.get_tag = async (request, response,next)  =>{
  try {
     const tag_id = request.params.id
     const tag = await Tag.findAll({
      attributes: ['id','name'],
      where :{
        id: tag_id
       } 
    });
     if (tag) {
      response.json({ tag });
     } else {
      response.json({"msg":'No category found..perhaps it was deleted'}).status(404)
     }
  } catch (error) {
      next(error)
  }
}