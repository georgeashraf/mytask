const express = require('express');
const productController = require('../controller/product')
const imageController = require('../controller/image')

const router = express.Router();

router.post('/product', productController.create_product);
router.get('/products', productController.get_products);
router.delete('/product/:id', productController.delete_product);
router.get('/product/:id', productController.get_product);
router.get('/productsfiltered', productController.get_products_filtered);
router.put('/product/:id', productController.update_product);





module.exports = router;
