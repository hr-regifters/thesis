const passport = require('passport');
const utility = require('./userController');

const SlackStrategy = require('passport-slack').Strategy;
const SLACK_ID = require('../../../env.js').SLACK_ID;
const SLACK_SECRET = require('../../../env.js').SLACK_SECRET;

module.exports = new SlackStrategy({
  clientID: SLACK_ID,
  clientSecret: SLACK_SECRET,
  callbackURL: 'http://127.0.0.1:1337/api/oauth/slack/callback',
  scope: 'incoming-webhook users:read'
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    console.log(accessToken, profile);
    // utility.addToken('alec', 'evernoteToken', accessToken);
    return done(null, profile);
  });
});
