const express = require('express');
const subcategoryController = require('../controller/subcategory')
const router = express.Router();

router.post('/subcategory', subcategoryController.create_subcategory);
router.get('/subcategories', subcategoryController.get_subcategories);
router.get('/subcategory/:id', subcategoryController.get_subcategory);
router.delete('/subcategory/:id', subcategoryController.delete_subcategory);
router.put('/subcategory/:id', subcategoryController.update_subcategory);



module.exports = router;
