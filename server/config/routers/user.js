const express = require('express');
const UserCtrl = require('../../db/controllers/userController');
const passport = require('passport');
const checkLogin = require('./../utilities/checkLogin');


const router = new express.Router();

router.get('/concoctions', checkLogin, UserCtrl.getUserConcoctions);
router.post('/signup', UserCtrl.signup);
router.post('/login', passport.authenticate('local', { failureRedirect: '/' }),
  function(req, res) {
    req.session.user = req.body.username;
    res.status(201).send('success');
  }
);
router.get('/authenticate', checkLogin,
  function(req, res) {
    let username = '';
    for (let key in req.sessionStore.sessions) {
      let session = JSON.parse(req.sessionStore.sessions[key]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    res.status(200).json(username);
  }
);
router.get('/logout',
  function(req, res) {
    req.sessionStore.sessions = {};
    res.status(200).send('success');
  })

module.exports = router;
