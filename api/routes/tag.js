const express = require('express');
const tagController = require('../controller/tag')
const router = express.Router();

router.post('/tag', tagController.create_tag);
router.get('/tags', tagController.get_tags);
router.delete('/tag/:id', tagController.delete_tag);
router.get('/tag/:id', tagController.get_tag);

router.put('/tag/:id', tagController.update_tag);



module.exports = router;