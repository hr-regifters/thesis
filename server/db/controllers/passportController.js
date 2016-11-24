const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const Local = require('./userController');
const Slack = require('./slackController');
const Evernote = require('./evernoteController');
const Github = require('./githubController');
const Fitbit = require('./fitbitController')

module.exports = (app) => {

  app.use(cookieParser());
  app.use(session({
    secret: 'cookie_secret',
    resave: true,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((obj, done) => {
    done(null, obj);
  });

  passport.use('local-login', Local.Login);
  passport.use('local-signup', Local.Signup);
  passport.use(Slack.Strategy);
  passport.use(Evernote.Strategy);
  passport.use(Github.Strategy);
  passport.use(Fitbit.Strategy);

  return passport;
};
