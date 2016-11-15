const express = require('express');
const utility = require('../../db/controllers/userController');
const passport = require('passport');

const router = new express.Router();

router.post('/signup',utility.signup);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }),
  function(req, res) {
    console.log(req.session);
    res.redirect('/');
  }
);

module.exports = router;
