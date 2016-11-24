"use strict"

const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const Promise = require('bluebird');
const saltRounds = 10;
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = Promise.promisifyAll(require('../config.js').pool);

// Error messages to log and return as responses
const incorrectPasswordErr = 'Incorrect password entered';
const usernameErr = 'Username in use';

exports.Login = new LocalStrategy(
  function(username, password, done) {
    pool.query({
        text: 'SELECT * FROM users \
          WHERE username = \'' + username + '\';'
      }, 

    function(err, rows) {
      if (rows.rowCount > 0) {
        bcrypt.compare(password, rows.rows[0].password, (err, user) => {
          err ? done(null, false) : done(null, user);
        });
      }
    });
  }
);

exports.Signup = new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    pool.query({
      text: 'SELECT * FROM users \
        WHERE username = \'' + username + '\';'
    }, 
    function(err, rows) {
      if (rows.rowCount > 0) {
        done(null,false);
      } else {
        bcrypt.hash(password, saltRounds, (error, hash) => {
          password = hash;
          pool.query({
            text: 'INSERT INTO users(username, email, password) \
              VALUES($1, $2, $3)',
            values: [username, req.body.email, password]
          },
          function(err, rows) {
            if (!err) {
              done(null,true);
            }
          });
        });
      }
    });
  }
);

exports.addTokenAndId = (username, apiToken, token, slackId) => {
  pool.query({
    text: 'UPDATE users \
    SET ' + apiToken + ' = \'' + token + '\' WHERE username = \'' + username + '\';'
  }, 
    (err, rows) => {
      if (err) { return err} else {
        console.log(rows)
      }
    }
  );
  if (slackId) {
    pool.query({
      text: 'UPDATE users SET  slackId = \'' + slackId + '\'  WHERE username = \'' + username + '\';'
    }, 
    (err,rows) => {
      if (err) { return err} else {
        console.log(rows)
      }
    });
  }
}

exports.getUserData = (userKey, userValue) => {
  return new Promise (function(resolve, reject) {
    pool.query({
      text: 'SELECT * FROM users WHERE ' + userKey + ' = \'' + userValue + '\';'
    }, (err,rows) => err ? reject(err) : resolve(rows.rows[0]))
  });
}

exports.getUserConcoctions = (req, res) => {
  const username = req.body.username || req.query.username;
  pool.query({
    text: 'SELECT * FROM users WHERE username = \'' + username + '\';'
  }, 
  function(err, rows) {
    if(rows.rowCount > 0) {
      let userId = rows.rows[0].id;
      let tokenArray = [];
      rows.rows[0].slacktoken ? tokenArray.push('slack') : tokenArray;
      rows.rows[0].evernotetoken ? tokenArray.push('evernote') : tokenArray;
      pool.query({
        text: 'SELECT id, enable, description, actionapi, actionevent, actionparams, triggerevent, triggerapi, triggerparams FROM concoctions WHERE userId = \'' + userId + '\';'
      }, function(err, rows) {
        const obj = {
          concoctions: rows.rows,
          oauths: tokenArray
        }
        res.status(200).send(obj)
      });
    }
  });
}
