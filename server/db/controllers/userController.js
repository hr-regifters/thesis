"use strict"

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Error messages to log and return as responses
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

  User.findOne({username: username}).then((user) => {
    user ? res.status(401).send(usernameErr) : bcrypt.hash(password, saltRounds, (error, hash) => {
      error ? res.send(error) : User.create({username: username, password: hash, email: email})
      .then((user) => {
        passport.authenticate('local', { failureRedirect: '/' });
        res.status(201).send('success');
      })
      .catch((error)=>{res.status(401).send('user was not created: ' + error)});
    });
  });
};
exports.addConcoction = (username, concoction, trigger) => { 
  User.findOne({username: username}).then((user) => {
    if (!user) {
      throw new error;
    } else {
      concoction['trigger'] = trigger;
      user.concoctions.push(concoction);
      user.save((err, updated) => {
        if (err) { console.log(err); };
      });
    }
  })
}

exports.addTokenAndId = (username, apiToken, token, slackId) => {
  User.findOne({username: username}).then((user) => {
    if (apiToken === 'slackToken') {
      user[apiToken] = token;
      user['slackId'] = slackId;
    } else {
      user[apiToken] = token;
    }
    user.save((err, updated) => {
      if (err) { console.log(err) };
      // err ? console.log(err) : console.log(updated);
    });
  });
};
//get slack user id and slack token from the
exports.getSlackId = username => User.findOne({username: username}).then((user) => user ? user.slackId ? user.slackId : "No slack ID" : "No user");

exports.getUserData = (userKey, userValue) => {
  let query = {};
  query[userKey] = userValue;
  return User.findOne(query).then((user) => user ? user : "no user");
};

exports.getUserConcoctions = (req, res) => {
  exports.getUserData('username', req.query.username)
  .then((user) => {
    var data = {
      oauths: [],
    };
    data.concoctions = user.concoctions;
    for (var key in user) {
      if (key.slice(key.length - 5, key.length) === 'Token' && user[key] != undefined) {
        data.oauths.push(key.slice(0, key.length - 5));
      }
    }
    res.status(200).json(data);
  })
  .catch((error) => { console.log('error in getUserConcoctions: ', error); res.status(500).send('Server error at fetching concoctions'); });
};
