"use strict"
const express = require('express');
const slackConcoction = require('../models/slackTriggerModel');
const userController = require('./userController');
const Promise = require('bluebird');
// generate new concoction
const getTriggerParams = (api, username, res) => {
  if (api === 'slack') {
    return userController.getSlackId(username).then((slackId) => {
      console.log(slackId);
      if (slackId !== "No slack ID" && slackId !== "No user") {
        return slackId;
      } else {
        throw new Error('odfnosdfn')
      }
    })
  } else {
    return userController.getUserData(username).then((user) => {
      return user.api;
    })
  } 
}

const getActionParams = (concObj, username) => { 
  return userController.getUserData('username', username).then((user) => {
    concObj['actionParams'][concObj['actionApi']] = user.evernoteToken;
    return //needs to be evernote api
  });
}


const writeSlackModel = (trigger, concObj, res) => {
  slackConcoction.findOne({trigger: trigger}).then((doc) => {
    if(doc !== null) {
      console.log('updating trigger document');
      doc.action.push({

        slackUserId: concObj['slackUserId'],
        actionApi: concObj['actionApi'],
        actionFunction: concObj['actionFunction'],
        actionParams: concObj['actionParams']
      });
      doc.save((err, updated) => err ? res.status(402).send(err) : res.status(201).send(updated));
    } else {
      console.log('new trigger document about to be created!');
      slackConcoction.create({
        trigger: trigger,
        action: [{
          slackUserId: concObj['slackUserId'],
          actionApi: concObj['actionApi'],
          actionFunction: concObj['actionFunction'],
          actionParams: concObj['actionParams']
        }]
      },(err,doc) => err ? res.status(402).send(err) : res.status(201).send(doc));
    }
  })
}

exports.getSlackEvent = (eventName) => {
  return slackConcoction.findOne({trigger: eventName}).then((event) => event.action);
}

exports.createSlackTrigger = (req,res) => {
  const testObj = {test: 'test'};
  const trigger = req.body.trigger;
  const username = req.body.username;
  let concObj = {
    slackUserId: '',
    actionApi: req.body.actionApi, 
    actionFunction: req.body.actionFunction,
    actionParams: req.body.actionParams || {}
  };

  getTriggerParams('slack', username, res)
  .then((slackId) => {
    concObj['slackUserId'] = slackId;
    return getActionParams(concObj, username)
  })
  .then(() => {
    concObj['actionParams'] = JSON.stringify(concObj['actionParams']);
    writeSlackModel(trigger, concObj, res);
    userController.addConcoction(username, concObj, trigger);
  })
  .catch(function(error) {
    res.status(405).send(error);
  })
}

