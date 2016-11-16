"use strict"
const express = require('express');
const slackConcoction = require('../models/slackTriggerModel');
const userController = require('./userController');
const Promise = require('blueBird');
// generate new concoction
const getTriggerParams = (api, username) => {
  if (api === 'slack') {
    return userController.getSlackId(username).then((slackId) => {
      if (slackId !== "No slack ID") {
        return slackId;
      } else { 
        res.status(404).send('no slack user id');
      }
    })
  } else {
    return userController.getUserData(username).then((user) => {
      return user.api;
    })
  } 
}
const getActionParams = (actionApi) => userController.getUserData(username).then((user) => {
  console.log('inside get action params');
  return 'dummytest'
})


exports.createSlackTrigger = (req,res) => {
  console.log('line 25');
  const trigger = req.body.trigger;
  const username = req.body.username;
  const actionApi = req.body.actionApi;
  //i get action key from database
  const actionFunction = req.body.actionFunction;
  let actionParams = JSON.parse(req.body.actionParams); // parent notebook, evernote token, 
  let slackUserId;
  console.log('line 32', actionParams);
  //get evernote token and append to action params
  getTriggerParams('slack', username)
  .then((slackId) => slackUserId = slackId)
  .then(() => {
    console.log('line 37 with udpated slackUserID', slackUserId)
    return getActionParams(actionApi)
  })
  .then((apiToken) => {
    return actionParams[actionApi] = apiToken;
  })
  .then(() => {
    console.log('about to write to db!', actionParams);
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
  })
}

exports.getSlackEvent = (eventName) => {
  return slackConcoction.findOne({trigger: eventName}).then((event)=>event.action);
}
