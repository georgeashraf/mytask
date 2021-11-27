const Product = require("../models/product");
const Subcategory = require("../models/subcategory");
const ProductTags = require("../models/producttags");
const Tags = require("../models/tag");

const imageController = require("./image");
const fetch = require("node-fetch");

// returns created element

exports.create_product = async (request, response, next) => {
  try {
    const product = await Product.create({
      name: request.body.name,
      description: request.body.description,
      price: request.body.price,
      subcategoryID: parseInt(request.body.subcategoryID),
    });
    if (product) {
      if (request.body.tags != []) {
        for (let element of request.body.tags) {
          console.log(element);
          const product_tags = await ProductTags.create({
            tagID: parseInt(element.id),
            productID: product.id,
          });
        }
      }

      response.json({ product });
    } else {
      response.status(500);
    }
  } catch (error) {
    next(error);
  }
};
// returns list of elements
exports.get_products = async (request, response, next) => {
  try {
    var products = await Product.findAll({
      attributes: ["id", "name", "description", "price"],
      raw: true,
      include: [
        {
          model: Subcategory,
          attributes: ["name"],
        },
      ],
    //   raw: true,
    });
    if (products) {
      for (var i=0,len=products.length;i<len;i++) {
          var element = products[i]
        //   console.log(element)
          let tags_arr=[]
        const producttag = await ProductTags.findAll({
          where: {
            productID: products[i].id,
          },
        });
        for (var e of producttag) {
          const tag = await Tags.findAll({
            where: {
              id: e.tagID,
            },
          });
          tags_arr.push(tag)
        }
        element.tag = tags_arr
    //     // const a = products.map(obj=> ({ ...obj, tag:tags_arr}))
      }
      response.json({ products });
    } else {
      response.status(500);
    }
  } catch (error) {
    next(error);
  }
};

exports.get_products_filtered = async (request, response, next) => {
  try {
    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const params = Object.fromEntries(urlSearchParams.entries());
    const cat_id = request.query.category;
    const subcat_id = request.query.subcategory;
    console.log(cat_id);
    console.log(subcat_id);
    let products = null;

    if (subcat_id) {
      products = await Product.findAll({
        attributes: ["id", "name", "description", "price"],
        where: {
          subcategoryID: subcat_id,
        },
      });
    } else {
      const subcategory = await Subcategory.findAll({
        where: {
          categoryID: cat_id,
        },
      });
      products = await Product.findAll({
        attributes: ["id", "name", "description", "price"],
        where: {
          subcategoryID: subcategory[0].id,
        },
      });
    }

    if (products) {
      response.json({ products });
    } else {
      response.status(500);
    }
  } catch (error) {
    next(error);
  }
};

// returns list of deleted elements
exports.delete_product = async (request, response, next) => {
  try {
    const product_id = request.params.id;
    const product = await Product.destroy({
      where: {
        id: product_id,
      },
    });
    if (product) {
      response.json({ product });
    } else {
      response
        .json({ msg: "No product found..perhaps it was already deleted" })
        .status(404);
    }
  } catch (error) {
    next(error);
  }
};

exports.get_product = async (request, response, next) => {
  try {
    const product_id = request.params.id;
    const product = await Product.findAll({
      where: {
        id: product_id,
      },
    });
    if (product) {
      response.json({ product });
    } else {
      response
        .json({ msg: "No product found..perhaps it was already deleted" })
        .status(404);
    }
  } catch (error) {
    next(error);
  }
};

exports.update_product = async (request, response, next) => {
  try {
    const product_id = request.params.id;
    const product = await Product.update(request.body, {
      where: {
        id: product_id,
      },
    });
    if (product) {
      response.json({ product });
    } else {
      response
        .json({ msg: "No product found..perhaps it was already deleted" })
        .status(404);
    }
  } catch (error) {
    next(error);
  }
};
