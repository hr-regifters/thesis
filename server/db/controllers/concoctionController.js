<<<<<<< HEAD
"use strict"
const express = require('express');
const slackConcoction = require('../models/slackTriggerModel');
const userController = require('./userController');
const Promise = require('blueBird');
// generate new concoction
exports.createSlackTrigger = (req,res) => {
  const trigger = req.body.trigger;
  const username = req.body.username;
  const actionApi = req.body.actionApi;
  const actionKey = req.body.actionKey;
  const actionFunction = req.body.actionFunction;
  const actionParams = req.body.actionParams; 
  let slackUserId;
  userController.getSlackId(username).then(function(slackId) {
    if(slackId !== "No slack ID") {
      slackUserId = slackId;
      return 
    } else { res.status(404).send('no slack user id');}
  }).then(() => {
    slackConcoction.findOne({trigger: trigger}).then((doc) => {
      if(doc !== null) {
        doc.action.push({
          slackUserId: slackUserId,
          actionApi: actionApi,
          actionKey: actionKey,
          actionFunction: actionFunction,
          actionParams: actionParams
        });
        doc.save((err, updated) => { err ? console.log(err) : console.log(updated);});
      } else {
        console.log('new trigger document about to be created!')
        slackConcoction.create({
          trigger: trigger,
          action: [{
            slackUserId: slackUserId,
            actionApi: actionApi,
            actionKey: actionKey,
            actionFunction: actionFunction,
            actionParams: actionParams
          }]
        },function(err,doc) {console.log(err,doc,'line41')})
      }
    })
  }).catch((noUser) => {console.log("Error, no user found")});
}

exports.getSlackEvent = (eventName) => 
  new Promise((resolve, reject) => {
    slackConcoction.findOne({trigger: eventName}).then((event)=>(resolve(event.action))).catch((error)=>reject(error));
  })
