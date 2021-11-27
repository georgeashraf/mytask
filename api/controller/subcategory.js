const { response } = require('express');
const Subcategory = require('../models/subcategory');
const Category = require('../models/category');


// returns created element
exports.create_subcategory = async (request, response,next)  =>{
     try {
        const category = await Category.findByPk(request.body.categoryID)
        if (category) {
            const subcategory = await Subcategory.create({
                name:request.body.name,
                description:request.body.description,
                categoryID:request.body.categoryID
            });
            if (subcategory) {
             response.json({ subcategory });
            } else {
             response.status(500);
            }
        } else {
            response.json({"msg":"category id is incorrect"}).status(400)
        }
       
     } catch (error) {
         next(error)
     }
 
}
// returns list of elements
exports.get_subcategories = async (request, response,next)  =>{
    try {
       const subcategories = await Subcategory.findAll({
        attributes: ['id','name','description'],
 
        include: [{
          model: Category,
          attributes: ['name','description'],
        
        }]
      });
       if (subcategories) {
        response.json({ subcategories });
       } else {
        response.status(500);
       }
    } catch (error) {
        next(error)
    }
}

// returns element
exports.get_subcategory = async (request, response,next)  =>{
    try {
       const subcategory_id = request.params.id
       const subcategory = await Subcategory.findAll({
        attributes: ['id','name','description'],
        where :{
          id: subcategory_id
         } ,
        include: [{
          model: Category,
          attributes: ['name','description'],
        
        }]
      });
       if (subcategory) {
        response.json({ subcategory });
       } else {
        response.json({"msg":'No category found..perhaps it was deleted'}).status(404)
       }
    } catch (error) {
        next(error)
    }
}

// returns list of deleted elements
exports.delete_subcategory = async (request, response,next)  =>{
    try {
       const subcategory_id = request.params.id
       const subcategory = await Subcategory.destroy({
        where: {
          id: subcategory_id
        }
      });
       if (subcategory) {
        response.json({ subcategory });
       } else {
        response.json({"msg":'No category found..perhaps it was already deleted'}).status(404)
       }
    } catch (error) {
        next(error)
    }
}

// returns list of updated elements
exports.update_subcategory = async (request, response,next)  =>{
    try {
       const subcategory_id = request.params.id
       const subcategory = await Subcategory.update(request.body, {
        where: {
          id: subcategory_id
        }
      });
       if (subcategory) {
        response.json({ subcategory });
       } else {
        response.json({"msg":'No category found..perhaps it was already deleted'}).status(404)
       }
    } catch (error) {
        next(error)
    }
}
  
