"use strict"

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Error messages to log and return as responses
const noUsernameErr = 'Sorry, username does not exist'; 
const incorrectPasswordErr = 'Incorrect password entered';
const usernameErr = 'Username in use';

exports.Strategy = new LocalStrategy(
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

exports.signup = (req, res) => { 
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  

  console.log('POST /api/user/signup. username:', username);

  User.findOne({username: username}).then((user) => {
    user ? res.status(401).send(usernameErr) : bcrypt.hash(password, saltRounds, (error, hash) => {
      error ? res.send(error) : User.create({username: username, password: hash, email: email})
      .then((user) => {
        passport.authenticate('local', { failureRedirect: '/' });
        console.log(req.session)
        res.status(201).send('success');
      })
      .catch((error)=>{res.status(401).send('user was not created: ' + error)});
    });
  });
};

exports.addTokenAndId = (username, apiToken, token, slackId) => {
  User.findOne({'username': username}).then((user) => {
    if (apiToken === 'slackToken') {
      user[apiToken] = token;
      user['slackId'] = slackId;
    } else {
      user[apiToken] = token;
    }
    user.save((err, updated) => {
      err ? console.log(err) : console.log(updated);
    });
  });
};
//get slack user id and slack token from the
exports.getSlackId = username => User.findOne({username: username}).then((user) => user ? user.slackId ? user.slackId : "No slack ID" : "No user");
exports.getUserData = username => User.findOne({username: username}).then((user) => user ? user : "no user");
