const express = require('express');
  
const utility = require('../../db/controllers/userController');
const passport = require('passport');


const router = new express.Router();

router.post('/signup',utility.signup);
router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    req.session.user = req.body.username;
    res.status(201).send('success');
  }
);

module.exports = router;
