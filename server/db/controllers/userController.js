const User = require('../models/userModel');

// Error messages to log and return as responses
const noUsernameErr = 'Sorry, username does not exist'; 
const incorrectPasswordErr = 'Incorrect password entered';
const usernameErr = 'Username in use';

exports.login = function(req, res) {
  console.log('POST /api/users/login. username:', req.body.username);
  User.findOne({username: req.body.username})
    .then(function(user) {
      if (!user) {
        console.log(errNoUsername);
        res.status(401).send();
      } else if (user.password !== req.body.password) {
        console.log(errIncorrectPassword);
        res.status(401).send();
      }

      res.status(201).send({
        'id_token': createToken(user)
      });
    });
};

exports.signup = function(req, res) {
  console.log('POST /api/users/signup. username:', req.body.username);
  User.findOne({username: req.body.username})
    .then(function(user) {
      if (!user) {
        User.create({
          username: req.body.username,
          password: req.body.password
        }).then(function(user) {
          res.status(201).send({
            'id_token': createToken(user)
          });
        });
      } else {
        console.log(errUsernameTaken);
        res.status(401).send();
      }
    });
};