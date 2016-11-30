"use strict"
const express = require('express');
const passport = require('passport');
const userUtility = require('../../db/controllers/userController');
const concoctionUtility = require('../../db/controllers/concoctionController');
const checkLogin = require('../utilities/checkLogin');
const router = new express.Router();
const request = require('request');
const env = {
              STRAVA_ID : '14913',
              STRAVA_SECRET : '47c056eab28aa434a6cef487c57600d2780587c0'
            };

router.get('/slack', checkLogin, passport.authenticate('slack'));

router.get('/slack/callback',
  passport.authorize('slack', { failureRedirect: '/' }),
  (slackData, res) => {
    const allSessions = slackData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    userUtility.addTokenAndId(username, 'slackToken', slackData.account[0], 'slack', slackData.account[1]);
    concoctionUtility.updateConcoctionsToken(username, 'slack', slackData.account[0]);
    res.redirect('/');
  }
);

router.get('/evernote', checkLogin, passport.authenticate('evernote'));

router.get('/evernote/callback',
  passport.authenticate('evernote', { failureRedirect: '/' }),
  (evernoteData, res) => {
    const allSessions = evernoteData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    userUtility.addTokenAndId(username, 'evernoteToken', evernoteData.user);
    concoctionUtility.updateConcoctionsToken(username, 'evernote', evernoteData.user);
    res.redirect('/');
  }
);

router.get('/github', checkLogin, passport.authenticate('github'));

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (githubData, res) => {
    const allSessions = githubData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    userUtility.addTokenAndId(username, 'githubToken', githubData.user);
    concoctionUtility.updateConcoctionsToken(username, 'github', githubData.user);
    res.redirect('/');
  }
);

router.get('/strava', checkLogin, passport.authenticate('strava'));

router.get('/strava/callback', 
  passport.authenticate('strava', { failureRedirect: '/'}),
  (stravaData, res) => {
    const allSessions = stravaData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    userUtility.addTokenAndId(username, 'stravaToken', stravaData.user[0], 'strava', stravaData.user[1]);
    concoctionUtility.updateConcoctionsToken(username, 'strava', stravaData.user[0]);
    res.redirect('/');
  }
);
router.get('/strava', checkLogin, passport.authenticate('strava'));

router.get('/strava/callback', 
  passport.authenticate('strava', { failureRedirect: '/'}),
  (stravaData, res) => {
    const allSessions = stravaData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    console.log(stravaData.user, 'stravaData.user')
    utility.addTokenAndId(username, 'stravatoken', stravaData.user[0], 'strava', stravaData.user[1]);
    let options = {
        uri: `https://api.strava.com/api/v3/push_subscriptions?client_id=${env.STRAVA_ID}&client_secret=${env.STRAVA_SECRET}&object_type=activity&aspect_type=create&callback_url=https://regifters48.herokuapp.com/api/webhooks/strava&verify=${stravaData.user[0]}`,
      }

    request.post(options, function(err, response, body) {
      console.log(err, 'err');
      console.log(response, 'response');
      console.log(body, 'body');
    })
    res.redirect('/');
  });

router.get('/fitbit', checkLogin, passport.authenticate('fitbit', { scope: ['activity','nutrition', 'profile', 'settings', 'sleep', 'weight', 'heartrate','location'] }));

router.get('/fitbit/callback', 
  passport.authenticate('fitbit', { failureRedirect: '/'}),
  (fitbitData, res) => {
    const allSessions = fitbitData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    userUtility.addTokenAndId(username, 'fitbitToken', fitbitData.user[0], 'fitbit', fitbitData.user[1]);
    concoctionUtility.updateConcoctionsToken(username, 'fitbit', fitbitData.user[0]);
    res.redirect('/');
  }
);

router.get('/google', checkLogin, passport.authenticate('google', {
  scope: ['https://www.googleapis.com/auth/drive',
          'https://www.googleapis.com/auth/plus.login',
          'https://mail.google.com',
          'https://www.googleapis.com/auth/gmail.compose',
          'https://www.googleapis.com/auth/gmail.modify',
          'https://www.googleapis.com/auth/gmail.send',
          'https://www.googleapis.com/auth/spreadsheets']
}));

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (googleData, res) => {
    const allSessions = googleData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    userUtility.addTokenAndId(username, 'googleToken', googleData.user);
    concoctionUtility.updateConcoctionsToken(username, 'googleSheets', googleData.user);
    concoctionUtility.updateConcoctionsToken(username, 'googleMail', googleData.user);
    res.redirect('/');
  }
);

router.get('/instagram', checkLogin, passport.authenticate('instagram'));

router.get('/instagram/callback',
  passport.authenticate('instagram', { failureRedirect: '/' }),
  (instagramData, res) => {
    const allSessions = instagramData.sessionStore.sessions;
    let username = '';
    for (let session in allSessions) {
      session = JSON.parse(allSessions[session]);
      if (session.hasOwnProperty('user')) {
        username = session['user'];
      }
    }
    userUtility.addTokenAndId(username, 'instagramToken', instagramData.user);
    concoctionUtility.updateConcoctionsToken(username, 'instagram', instagramData.user);
    res.redirect('/');
  }
);

module.exports = router;
