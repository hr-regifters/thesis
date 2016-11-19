const passport = require('passport');
const User = require('../models/userModel');
const currUrl = require('./../../../currUrl');
const request = require('request-promise');

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
    console.log(accessToken)
    var slackData = [accessToken, profile.id];
    return done(null, slackData);
  });
});

module.exports.getFile = (slackId, fileId) => {
  const token = 'xoxp-41796934391-76814112084-107473085062-013f901abd34434104fbaef1d04318fe';
  request(`https://slack.com/api/files.info?token=${token}&file=${fileId}&pretty=1`)
  .then((fileObj) => {
    fileObj = JSON.parse(fileObj);
    if (fileObj.ok) {
      return fileObj.file;
    } else {
      throw new Error(fileObj);
    }
  })
  .catch((error) => { console.log('Error in slackCtrl getFile: ', error); });
};