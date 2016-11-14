const express = require('express');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy;
const CLIENT_ID = require('../../../env.js').CLIENT_ID;
const CLIENT_SECRET = require('../../../env.js').CLIENT_SECRET;
const utility = require('./userController');

module.exports = passport.use(new SlackStrategy({
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  scope: 'incoming-webhook users:read'
},
function(accessToken, refreshToken, profile, done) {
  utility.addToken('alec', 'slackToken', accessToken);
  return done(null, profile);
}
));
