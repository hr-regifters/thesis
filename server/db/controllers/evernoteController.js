const passport = require('passport');
const utility = require('./userController');

const EvernoteStrategy = require('passport-evernote').Strategy;
const EVERNOTE_ID = require('../../../env.js').EVERNOTE_ID;
const EVERNOTE_SECRET = require('../../../env.js').EVERNOTE_SECRET;

module.exports = new EvernoteStrategy({
  requestTokenURL: 'https://sandbox.evernote.com/oauth',
  accessTokenURL: 'https://sandbox.evernote.com/oauth',
  userAuthorizationURL: 'https://sandbox.evernote.com/OAuth.action',
  consumerKey: EVERNOTE_ID,
  consumerSecret: EVERNOTE_SECRET,
  callbackURL: 'http://127.0.0.1:1337/api/oauth/evernote/callback',
}, (accessToken, refreshToken, profile, done) => {
  process.nextTick(() => {
    console.log(accessToken, profile);
    // utility.addToken('alec', 'evernoteToken', accessToken);
    return done(null, profile);
  });
});
