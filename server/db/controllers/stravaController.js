const passport = require('passport');
const currUrl = require('./../../../currUrl');

StravaStrategy = require('passport-strava-oauth2').Strategy;
const STRAVA_ID = process.env.STRAVA_ID || require('../../../env.js').STRAVA_ID;
const STRAVA_SECRET = process.env.STRAVA_SECRET || require('../../../env.js').STRAVA_SECRET;

module.exports.Strategy = new StravaStrategy({
  clientID: STRAVA_ID,
  clientSecret: STRAVA_SECRET,
  callbackURL: `${currUrl}/api/oauth/strava/callback`
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    const dataPass = [accessToken, profile.id];
    return done(null, dataPass);
  });
});
