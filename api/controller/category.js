const Category = require("../models/category");
const Subcategory = require("../models/subcategory");

// returns created element

exports.create_category = async (request, response, next) => {
  try {
    const subcategory_arr = request.body.subcategories;
    if (request.body.name != "" && request.body.description != "") {
      const category = await Category.create({
        name: request.body.name,
        description: request.body.description,
      });
      if (subcategory_arr != []) {
        for (let element of subcategory_arr) {
          const subcategory = await Subcategory.create({
            name: element.name,
            description: element.description,
            categoryID: category.id,
          });
        }
      }
      response.json({ category });
    } else {
      if (subcategory_arr != []) {
        for (let element of subcategory_arr) {
          const subcategory = await Subcategory.create({
            name: element.name,
            description: element.description,
          });
        }
      }
      response.json({ subcategory_arr });
    }
  } catch (error) {
    next(error);
  }
};
// returns list of elements
exports.get_categories = async (request, response, next) => {
  try {
    console.log("in all categories");
    const categories = await Category.findAll({
      attributes: ["id", "name", "description"],

      include: [
        {
          model: Subcategory,
          attributes: ["id","name", "description"],
        },
      ],
    });
    if (categories) {
      response.json({ categories });
    } else {
      response.status(500);
    }
  } catch (error) {
    next(error);
  }
};

// returns element
exports.get_category = async (request, response, next) => {
  try {
    const category_id = request.params.id;
    const category = await Category.findAll({
      attributes: ["id", "name", "description"],
      where: {
        id: category_id,
      },
      include: [
        {
          model: Subcategory,
          attributes: ["id", "name", "description"],
        },
      ],
    });
    if (category) {
      response.json({ category });
    } else {
      response
        .json({ msg: "No category found..perhaps it was deleted" })
        .status(404);
    }
  } catch (error) {
    next(error);
  }
};

// returns list of deleted elements
exports.delete_category = async (request, response, next) => {
  try {
    const category_id = request.params.id;
    const category = await Category.destroy({
      where: {
        id: category_id,
      },
    });
    if (category) {
      response.json({ category });
    } else {
      response
        .json({ msg: "No category found..perhaps it was already deleted" })
        .status(404);
    }
  } catch (error) {
    next(error);
  }
};

// returns list of updated elements
exports.update_category = async (request, response, next) => {
  try {
    const category_id = request.params.id;
    const category = await Category.update(request.body, {
      where: {
        id: category_id,
      },
    });
    const subcategory_arr = request.body.new_subcategories;
    const deleted_subcategory_arr = request.body.deleted_subcategory;
     if (subcategory_arr != []) {
      for (let element of subcategory_arr) {
                const subcategory = await Subcategory.update(
            {
              categoryID: category_id,
            },
            {
              where: {
                id: element.id,
              },
            }
          );
      }
    }
    if (deleted_subcategory_arr != []) {
      for (let element of deleted_subcategory_arr) {
        if (element.id) {
          const subcategory = await Subcategory.destroy({
            where: {
              id: element.id,
            },
          });
        }
      }
    }
    if (category) {
      response.json({ category });
    } else {
      response
        .json({ msg: "No category found..perhaps it was already deleted" })
        .status(404);
    }
  } catch (error) {
    next(error);
  }
};
