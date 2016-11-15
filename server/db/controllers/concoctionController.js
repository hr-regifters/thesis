const express = require('express');
const slackConcoction = require('../models/slackTriggerModel');
const userController = require('./slackController');
const Promise = require('blueBird');
// generate new concoction
exports.createSlackTrigger = (username, options) => {
  new Promise((resolve, reject) => { 
    const user = userController.getSlackToken(username);
    user !== '"No slack Token"' ? resolve(user) : reject(user);
  }).then((user) => {
    slackConcoction.findOne({trigger: options.trigger}).then((trigger) => {
      if(trigger !== null) {
        trigger.action.push({
          slackUserId: options.slackUserId,
          actionApi: options.actionApi,
          actionKey: options.actionKey,
          actionFunction: options.actionFunction,
          actionParams: options.actionParams
        });
        trigger.save((err, updated) => { err ? console.log(err) : console.log(updated);});
      } else {
        slackConcoction.create({
          trigger: options.trigger,
          action: [{
            slackUserId: options.slackUserId,
            actionApi: options.actionApi,
            actionKey: options.actionKey,
            actionFunction: options.actionFunction,
            actionParams: options.actionParams
          }]
        })
      }
    })
  }).catch((noUser) => {console.log("Error, no user found")});
}

exports.getSlackEvent = (eventName) => 
  new Promise((resolve, reject) => {
    slackConcoction.findOne({trigger: eventName}).then((event)=>(resolve(event.action)).catch((error)=>reject(error));
  }))