const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const utility = require('./userController');

const SlackStrategy = require('./slackController');
const EvernoteStrategy = require('./evernoteController');

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

  passport.use(SlackStrategy);
  passport.use(EvernoteStrategy);

  app.use(passport.initialize());
  app.use(passport.session());

  return passport;
};