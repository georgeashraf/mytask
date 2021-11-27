const express = require('express');
const userController = require('../controller/user')
const router = express.Router();

router.get('/users', userController.get_users);
router.get('/user/:id', userController.get_user);
router.put('/user/:id', userController.update_user);
router.put('/disable_user/:id', userController.disable_user);




module.exports = router;