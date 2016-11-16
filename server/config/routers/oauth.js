const express = require('express');
const passport = require('passport');
const SlackStrategy = require('../../db/controllers/slackController');
const utility = require('../../db/controllers/userController');
const router = new express.Router();

router.get('/slack', passport.authenticate('slack'));

router.get('/slack/callback',
  // failure redirect should redirect to homepage and not login
  passport.authorize('slack', { failureRedirect: '/' }),
  // expects req.body to contain username
  function(slackData, res) {
    // success redirect should redirect back to concoction and not login
    utility.addTokenAndId('username', 'slackToken', slackData.account[0], slackData.account[1]);
    res.redirect('/');
  }
);

router.get('/evernote', passport.authenticate('evernote'));

router.get('/evernote/callback',
  // failure redirect should redirect to homepage and not login
  passport.authenticate('evernote', { failureRedirect: '/' }),
  function(evernoteData, res) {
    // success redirect should redirect back to concoction and not login
    utility.addTokenAndId('username', 'evernoteToken', evernoteData.user);
    res.redirect('/');
  }
);

module.exports = router;