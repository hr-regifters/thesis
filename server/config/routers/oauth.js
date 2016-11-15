const express = require('express');
const passport = require('passport');
const SlackStrategy = require('../../db/controllers/slackController');
const router = new express.Router();

router.get('/slack', passport.authenticate('slack'));

router.get('/slack/callback',
  passport.authorize('slack', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/evernote', passport.authenticate('evernote'));

router.get('/evernote/callback', 
  passport.authenticate('evernote', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

module.exports = router;