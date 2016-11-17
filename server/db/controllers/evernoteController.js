const passport = require('passport');
const currUrl = require('./../../../currUrl');

const EvernoteStrategy = require('passport-evernote').Strategy;
const EVERNOTE_ID = process.env.EVERNOTE_ID || require('../../../env.js').EVERNOTE_ID;
const EVERNOTE_SECRET = process.env.EVERNOTE_SECRET || require('../../../env.js').EVERNOTE_SECRET;

module.exports.Strategy = new EvernoteStrategy({
  requestTokenURL: 'https://sandbox.evernote.com/oauth',
  accessTokenURL: 'https://sandbox.evernote.com/oauth',
  userAuthorizationURL: 'https://sandbox.evernote.com/OAuth.action',
  consumerKey: EVERNOTE_ID,
  consumerSecret: EVERNOTE_SECRET,
  callbackURL: `${currUrl}/api/oauth/evernote/callback`,
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    return done(null, accessToken);
  });
});
