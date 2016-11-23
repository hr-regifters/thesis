const express = require('express');
const UserCtrl = require('../../db/controllers/userController');
const passport = require('passport');
const checkLogin = require('./../utilities/checkLogin');


const router = new express.Router();

router.get('/concoctions', UserCtrl.getUserConcoctions);
router.post('/signup', UserCtrl.signup);
router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    req.session.user = req.body.username;
    res.status(201).send('success');
  }
);

module.exports = router;
