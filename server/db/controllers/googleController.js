const passport = require('passport');
const currUrl = require('./../../../currUrl');

const GoogleStrategy = require('passport-google-oauth2').Strategy;
const GOOGLE_ID = process.env.GOOGLE_ID || require('../../../env.js').GOOGLE_ID;
const GOOGLE_SECRET = process.env.GOOGLE_ID || require('../../../env.js').GOOGLE_SECRET;

module.exports.Strategy = new GoogleStrategy({
  clientID: GOOGLE_ID,
  clientSecret: GOOGLE_SECRET,
  callbackURL: `${currUrl}/api/oauth/google/callback`,
  passReqToCallback: true
}, (request, accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    return done(null, accessToken);
  });
});