const express = require('express');

const utility = require('../../db/controllers/userController');


const router = new express.Router();

router.post('/signup',utility.signup);
router.post('/login', utility.login);

module.exports = router;
