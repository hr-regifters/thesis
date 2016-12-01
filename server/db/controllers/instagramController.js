const passport = require('passport');
const currUrl = require('./../../../currUrl');

const InstagramStrategy = require('passport-instagram').Strategy;
const INSTA_ID = process.env.INSTA_ID || require('../../../env.js').INSTA_ID;
const INSTA_SECRET = process.env.INSTA_ID || require('../../../env.js').INSTA_SECRET;

module.exports.Strategy = new InstagramStrategy({
  clientID: INSTA_ID,
  clientSecret: INSTA_SECRET,
  callbackURL: `${currUrl}/api/oauth/instagram/callback`
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    const instaData = [accessToken, profile.id];
    return done(null, instaData);
  });
});
