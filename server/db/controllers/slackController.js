const express = require('express');
const passport = require('passport');
const SlackStrategy = require('passport-slack').Strategy; 
const clientID = require('../../../env.js').CLIENT_ID;
const clientSecret = require('../../../env.js').CLIENT_SECRET;

module.exports = passport.use(new SlackStrategy({
    clientID: clientID,
    clientSecret: clientSecret,
    scope: 'incoming-webhook users:read'
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ SlackId: profile.id }, function (err, user) {
      return done(err, user);
    });
    console.log(accessToken, refreshToken, profile)
    // return done(null, profile);
  }
));