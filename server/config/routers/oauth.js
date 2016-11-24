"use strict"
const express = require('express');
const passport = require('passport');
const utility = require('../../db/controllers/userController');
const checkLogin = require('../utilities/checkLogin');
const router = new express.Router();

router.get('/slack', checkLogin, passport.authenticate('slack'));

router.get('/slack/callback',
  passport.authorize('slack', { failureRedirect: '/' }),
  function(slackData, res) {
    const allSessions = slackData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    utility.addTokenAndId(username, 'slackToken', slackData.account[0], slackData.account[1]);

    res.redirect('/');
  }
);

router.get('/evernote', checkLogin, passport.authenticate('evernote'));

router.get('/evernote/callback',
  passport.authenticate('evernote', { failureRedirect: '/' }),
  function(evernoteData, res) {
    const allSessions = evernoteData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    utility.addTokenAndId(username, 'evernoteToken', evernoteData.user);

    res.redirect('/');
  }
);

router.get('/github', checkLogin, passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(githubData, res) {
    const allSessions = githubData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    // utility.addTokenAndId(username, 'githubToken', githubData.session.passport.user);
    res.redirect('/');
  }
);

router.get('/fitbit', checkLogin, passport.authenticate('fitbit', { scope: ['activity','heartrate','location','profile'] }));

router.get('/fitbit/callback', 
  passport.authenticate('fitbit', { failureRedirect: '/'}),
  function(fitbitData, res) {
    const allSessions = fitbitData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    // utility.addTokenAndId(username, 'fitbitToken', fitbitData.session.passport.user);
    res.redirect('/');
  }
);

module.exports = router;
