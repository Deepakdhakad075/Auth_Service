const express = require('express');
const router = express.Router();

const {UserController} = require('../../controllers/user-controller');
const {AuthMiddleware} = require('../../middlewares');



router.post('/register',AuthMiddleware.AuthReqMiddleware, UserController.createUser);
router.get('/user/:id', UserController.getUser);
router.post('/signin', UserController.signIn);
router.get('/user', UserController.isAuthenticated);

router.get('/isAdmin', AuthMiddleware.isAdminMiddleware, UserController.isAdmin);
module.exports =  router;