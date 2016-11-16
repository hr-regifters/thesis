const passport = require('passport');
const User = require('../models/userModel');

const SlackStrategy = require('passport-slack').Strategy;
const SLACK_ID = process.env.SLACK_ID || require('../../../env.js').SLACK_ID;
const SLACK_SECRET = process.env.SLACK_SECRET || require('../../../env.js').SLACK_SECRET;

module.exports.Strategy = new SlackStrategy({
  clientID: SLACK_ID,
  clientSecret: SLACK_SECRET,
  callbackURL: 'http://127.0.0.1:1337/api/oauth/slack/callback',
  scope: 'incoming-webhook users:read'
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    var slackData = [accessToken, profile.id]
    return done(null, slackData);
  });
});
