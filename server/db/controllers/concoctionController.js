"use strict"
const express = require('express');
const slackConcoction = require('../models/slackTriggerModel');
const userController = require('./userController');
const Promise = require('bluebird');
const pool = (require('../config.js').pool);

exports.queryConcoctions = (req, res) => {
  pool.query({
    text: 'SELECT * FROM concoctions;'
  }, function(err, rows) {
    console.log(err, rows.rows)
    res.status(201).send(rows.rows);
  }); 
}

const getActionIdandToken = (concObj, username, res) => {
  if (concObj['actionapi'] === 'slack') {
    return userController.getUserData('username', username).then((user) => {
      if (user.slackid && user.slacktoken) {
        concObj['userid'] = user.id;
        concObj['actionuserid'] = user.slackid;
        concObj['actiontoken'] = user.slacktoken;
        return concObj;
      } else {
        res.status(405).send('cant find user');
      }
    });
  } else if (concObj['actionapi'] === 'evernote') {
    return userController.getUserData('username', username).then((user) => {
      if (user.evernotetoken) {
        concObj['userid'] = user.id;
        concObj['actiontoken'] = user.evernotetoken;
        return concObj;
      } else {
        res.status(405).send('cant find user');
      }
    })    
  } else {
    res.status(405).send('cant find user');
  } 
}
const writeConcoction = function(concObj, res) {
  pool.query({
    text: 'INSERT INTO concoctions(userid, triggerapi, triggerevent, triggerparams, actionapi, actionevent,\
    actionuserid, actiontoken, actionparams, enable, description) \
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
    values: [concObj['userid'],concObj['triggerapi'],concObj['triggerevent'],'{}',
    concObj['actionapi'],concObj['actionevent'],concObj['actionuserid'],concObj['actiontoken'],
    '{}',concObj['enable'], concObj['description']]
  }, function(err, rows) {
    console.log(err);
    res.status(201).send(rows);
  });
}
exports.createConcoction = (req,res) => {
  const username = req.body.username;
  let concObj = {
    userid: '',
    triggerapi: req.body.triggerApi,
    triggerevent: req.body.triggerEvent,
    triggerparams: req.body.triggerParams || {}, 
    actionapi: req.body.actionApi,
    actionevent: req.body.actionEvent,
    actionuserid: '',
    actiontoken: '',
    actionparams: req.body.actionParams || {},
    enable: req.body.enable|| true, //this is a boolean 
    description: req.body.description 
  };
//get action id, token, and userId
  getActionIdandToken(concObj, username, res)
  .then((concObj) => {
    writeConcoction(concObj, res);
  }).catch(function(error) {
    res.status(405).send(error);
  });
}

const getConcoctions = (api, event) => {
  return pool.query({
    text: 'SELECT * FROM concoctions WHERE triggerapi= \'' + api + '\' AND triggerevent= \'' + event + '\' ;'
  }, function(err,rows) {
    return err ? err : rows.rows; 
  });
}

exports.toggleConcoction = (req,res) => {
  const concId = req.body.concId;
  return pool.query({
    text: 'SELECT enable FROM concoctions WHERE id = \'' + concId + '\';'
  }, function(err, rows) {
    if (err) {
      return err
    } else {
      const toggle = !rows.rows[0].enable;
      pool.query({
        text: 'UPDATE concoctions \
        SET enable = ' + toggle + ' WHERE id = \'' + concId + '\';' 
      }, function(err, rows) {
        res.status(201).send('updated bruh');
      });
    }
  });
}

