const passport = require('passport');
const currUrl = require('./../../../currUrl');

const GithubStrategy = require('passport-github').Strategy;
const GITHUB_ID = process.env.GITHUB_ID || require('../../../env.js').GITHUB_ID;
const GITHUB_SECRET = process.env.GITHUB_ID || require('../../../env.js').GITHUB_SECRET;

module.exports.Strategy = new GithubStrategy({
  clientID: GITHUB_ID,
  clientSecret: GITHUB_SECRET,
  callbackURL: `${currUrl}/api/oauth/github/callback`
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    console.log(accessToken)
    return done(null, accessToken);
  });
});
