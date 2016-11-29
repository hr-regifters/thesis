// const passport = require('passport');
// const currUrl = require('./../../../currUrl');

// const FitbitStrategy = require( 'passport-fitbit-oauth2' ).FitbitOAuth2Strategy;;
// const FITBIT_ID = process.env.FITBIT_ID || require('../../../env.js').FITBIT_ID;
// const FITBIT_SECRET = process.env.FITBIT_SECRET || require('../../../env.js').FITBIT_SECRET;

// module.exports.Strategy = new FitbitStrategy({
//   clientID: FITBIT_ID,
//   clientSecret: FITBIT_SECRET,
//   callbackURL: `${currUrl}/api/oauth/fitbit/callback`
// }, (accessToken, refreshToken, profile, done) => {
//   process.nextTick(() => {
//     return done(null, accessToken);
//   });
// });
