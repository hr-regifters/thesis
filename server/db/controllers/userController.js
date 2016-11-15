"use strict"

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Error messages to log and return as responses
const noUsernameErr = 'Sorry, username does not exist'; 
const incorrectPasswordErr = 'Incorrect password entered';
const usernameErr = 'Username in use';

exports.login = (req, res) => { 
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  
  console.log('POST /api/user/login. username:', username);

  User.findOne({username: username}).then((user) => {
    !user ? res.status(401).send(noUsernameErr) : bcrypt.compare(password, user.password, (err, success) => {
      success ? res.status(201).send() : res.status(401).send(incorrectPasswordErr);
    });
  }); 
};

exports.signup = (req, res) => { 
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  

  console.log('POST /api/user/signup. username:', username);

  User.findOne({username: username}).then((user) => {
    user ? res.status(401).send(usernameErr) : bcrypt.hash(password, saltRounds, (error, hash) => {
      error ? res.send(error) : User.create({username: username, password: hash, email: email})
      .then((user) => {res.status(201).send('success')})
      .catch((error)=>{res.status(401).send('user was not created: ' + error)});
    });
  });
};

exports.addTokenAndId = (username, api, token, slackId) => {
  User.findOne({'username': username}).then((user) => {
    if (api === 'slackToken') {
      user[api] = token;
      user['slackId'] = slackId;
    } else {
      user[api] = token;
    }
    user.save((err, updated) => {
      err ? console.log(err) : console.log(updated);
    });
  });
};
//get slack user id and slack token from the
exports.getSlackId = username => User.findOne({username: username}).then((user) => user.slackId ? user.slackId : "No slack ID");

