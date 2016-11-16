const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const Local = require('./userController');
const Slack = require('./slackController');
const Evernote = require('./evernoteController');

module.exports = (app) => {

  app.use(cookieParser());
  app.use(session({
    secret: 'cookie_secret',
    resave: true,
    saveUninitialized: true,
  }));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use(Local.Strategy);
  passport.use(Slack.Strategy);
  passport.use(Evernote.Strategy);

  app.use(passport.initialize());
  app.use(passport.session());

  return passport;
};