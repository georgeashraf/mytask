const express = require('express');
const categoryController = require('../controller/category')

const router = express.Router();

router.post('/category', categoryController.create_category);
router.get('/categories', categoryController.get_categories);
router.get('/category/:id', categoryController.get_category);
router.delete('/category/:id', categoryController.delete_category);
router.put('/category/:id', categoryController.update_category);





module.exports = router;
