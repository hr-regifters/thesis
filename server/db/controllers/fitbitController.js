const passport = require('passport');
const currUrl = require('./../../../currUrl');

const FITBIT_ID = process.env.FITBIT_ID || require('../../../env.js').FITBIT_ID;
const FITBIT_SECRET = process.env.FITBIT_SECRET || require('../../../env.js').FITBIT_SECRET;
const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;;

module.exports.Strategy = new FitbitStrategy({
    clientID: FITBIT_ID,
    clientSecret: FITBIT_SECRET,
    callbackURL: `${currUrl}/api/oauth/fitbit/callback`
  },
  function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, 'access token', refreshToken, 'refresh token', done);  
  }
));
