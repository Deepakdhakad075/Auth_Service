const express = require('express');
const router = express.Router();

const {UserController} = require('../../controllers/user-controller');



router.post('/register', UserController.createUser);
router.get('/user/:id', UserController.getUser);
router.post('/signin', UserController.signIn);
module.exports =  router;