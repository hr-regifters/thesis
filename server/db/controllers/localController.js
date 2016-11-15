const passport = require('passport');
const utility = require('./userController');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const LocalStrategy = require('passport-local').Strategy;

module.exports.Strategy = new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) { return done(null, false); }
      bcrypt.compare(password, user.password, (err, user) => {
        err ? done(null, false) : done(null, user);
      });
    });
  }
);
