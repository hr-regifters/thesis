const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Error messages to log and return as responses
const noUsernameErr = 'Sorry, username does not exist'; 
const incorrectPasswordErr = 'Incorrect password entered';
const usernameErr = 'Username in use';

exports.login = function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  console.log('POST /api/user/login. username:', username);
  User.findOne({username: username})
    .then(function(user) {
      if (!user) {
        console.log(noUsernameErr);
        res.status(401).send();
      } else {
        bcrypt.compare(password, user.password, function(err, success) {
          if (success) {
            res.status(201).send();  
          } else {
            console.log(incorrectPasswordErr);
            res.status(401).send();
          }
        }) 
      }
    });
};

exports.signup = function(req, res) {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;

  console.log('POST /api/user/signup. username:', username);

  User.findOne({username: username})
  .then(function(user) {
      //need to promisify this
    if (!user) {
      bcrypt.hash(password, saltRounds, function(error, hash) {
        if (error) {
          res.send(error);
        } else {
          password = hash;
          User.create({username: username, password: password,email: email})
          .then(function(user) {
            res.status(201)
          })
        }
      });
    } else {
      console.log(usernameErr);
      res.status(401).send();
    }
  });
};