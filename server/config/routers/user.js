"use strict"
const express = require('express');
const UserCtrl = require('../../db/controllers/userController');
const passport = require('passport');
const checkLogin = require('./../utilities/checkLogin');


const router = new express.Router();

router.get('/concoctions', checkLogin, UserCtrl.getUserConcoctions);
router.post('/signup', passport.authenticate('local-signup', { failureRedirect: '/' }),
  function(req, res) {
    req.session.user = req.body.username;
    res.status(201).send('success');
  }
);
router.post('/login', passport.authenticate('local-login', { failureRedirect: '/' }),
  function(req, res) {
    req.session.user = req.body.username;
    res.status(201).send('success');
  }
);
router.get('/logout',
  function(req, res) {
    req.sessionStore.sessions = {};
    res.status(200).send('success');
  })

module.exports = router;
