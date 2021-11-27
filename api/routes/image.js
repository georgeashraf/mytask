const express = require('express');
const router = express.Router();
const imageController = require('../controller/image')

router.post('/file_upload/:id', imageController.upload.single('file'), imageController.upload_image)
router.post('/file_upload_category/:id', imageController.upload_category.single('file'), imageController.upload_image)


router.delete('/file_upload/:name',imageController.upload.single('file'), imageController.delete_image )
 

module.exports = router;
