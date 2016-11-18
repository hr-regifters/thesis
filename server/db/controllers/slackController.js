const passport = require('passport');
const User = require('../models/userModel');
const currUrl = require('./../../../currUrl');
const request = require('request');

const SlackStrategy = require('passport-slack').Strategy;
const SLACK_ID = process.env.SLACK_ID || require('../../../env.js').SLACK_ID;
const SLACK_SECRET = process.env.SLACK_SECRET || require('../../../env.js').SLACK_SECRET;

module.exports.Strategy = new SlackStrategy({
  clientID: SLACK_ID,
  clientSecret: SLACK_SECRET,
  callbackURL: `${currUrl}/api/oauth/slack/callback`,
  scope: 'incoming-webhook users:read files:read channels:history'
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    var slackData = [accessToken, profile.id];
    return done(null, slackData);
  });
});

module.exports.getFile = (slackId, fileId) =>
  User.findOne({ slackId: slackId })
  .then((user) => request(`https://slack.com/api/files.info?token=${user.slackToken}&file=${fileId}&pretty=1`))
  .then((fileObj) => JSON.parse(fileObj).file);
}