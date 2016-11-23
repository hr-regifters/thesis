"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const slackCtrl = require('../../../db/controllers/slackController');
const userCtrl = require('../../../db/controllers/userController');
const request = require('request');
const listenTo = {
  file_created: true,
  pin_added: true,
};

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    var currentTime = Number(new Date());
    if (req.body.type === 'url_verification') {
      res.json({ challenge: req.body.challenge });
    } else if (listenTo[req.body.event.type] && req.body.event['event_ts'] * 1000 > currentTime - 10800000
      && req.body.event.event_ts * 1000 < currentTime && req.body.token === 'a1w5cdEEWMlk4t8TZ60TOX43'
      && req.body.api_app_id === 'A31R4FZ6H') { // check gating credentials (timestamp max age 3hrs)
      res.status(200).send('registered slack event');
      console.log(req.body);
      let slackReqObj = {
        slackUserId: '',
        title: '',
        body: '',
        links: [],
        images: [],
        tagNames: [],
        actionParams: '',
      };

        // fetch db data for users to get actions
        //this now needs to be concCtrl.getConcoctions(triggerapi, event) This returns an array of objects
      concCtrl.getSlackEvent(req.body.event.type).then((arr) => {
        async.each(arr, (obj, callback) => {
          if (obj.enabled && req.body['authed_users'].indexOf(obj.slackUserId) !== -1) {
            console.log('into async', obj);
            if (obj.actionApi === undefined || obj.actionFunction === undefined) {
              console.log(`PLEASE FIX! actiionApi or actionFunction undefined for slackUserId: ${obj.slackUserId}`);
              callback();
            } else {
              if (req.body.event.type === 'file_created' && obj.actionApi === 'evernote' && obj.actionFunction === 'post_note') {
                slackCtrl.getFile(req.body.event.file_id)
                .then((file) => {
                  slackReqObj.title = file.title;
                  if (file.mimetype.slice(0, 5) === 'image') {
                    slackReqObj.images = [file.url_private];
                  }
                  slackReqObj.links = [file.url_private];
                  slackReqObj.body = new Date(file.timestamp * 1000).toString();
                  slackReqObj.tagNames = ['Slack', 'Upload'];
                  slackReqObj.slackUserId = obj.slackUserId;
                  slackReqObj.actionParams = JSON.parse(obj.actionParams);
                  webhooksHandler[`${obj.actionApi}Action`][obj.actionFunction](slackReqObj);
                  callback();
                }).catch((error) => { console.log('Error in file_created and evernote post_note action: ', error); });
              } else if (req.body.event.type === 'pin_added' && obj.actionApi === 'evernote' && obj.actionFunction === 'post_note') {
                if (req.body.event.item.type === 'file') {
                  slackCtrl.getFile(req.body.event.item.file_id)
                  .then((file) => {
                    slackReqObj.title = file.title;
                    if (file.mimetype.slice(0, 5) === 'image') {
                      slackReqObj.images = [file.url_private];
                    }
                    slackReqObj.links = [file.url_private];
                    slackReqObj.body = new Date(file.timestamp * 1000).toString();
                    slackReqObj.tagNames = ['Slack', 'Pin'];
                    slackReqObj.slackUserId = obj.slackUserId;
                    slackReqObj.actionParams = JSON.parse(obj.actionParams);
                    webhooksHandler[`${obj.actionApi}Action`][obj.actionFunction](slackReqObj);
                    callback();
                  }).catch((error) => { console.log('Error in pin_added file and evernote post_note action: ', error); });
                } else if (req.body.event.item.type === 'message') {
                  var msg = req.body.event.item.message;
                  slackReqObj.title = msg.text.split(' ').slice(0,3).join(' ') + '...';
                  slackReqObj.links = [msg.permalink];
                  slackReqObj.body = new Date(req.body.event.item.created * 1000).toString() + '<br/>' + '<br/>' + msg.text;
                  slackReqObj.tagNames = ['Slack', 'Pin'];
                  slackReqObj.slackUserId = obj.slackUserId;
                  slackReqObj.actionParams = JSON.parse(obj.actionParams);
                  webhooksHandler[`${obj.actionApi}Action`][obj.actionFunction](slackReqObj);
                  callback();
                }
              } else if (obj.actionApi === 'slack' && obj.actionFunction === 'post_message') {
                userCtrl.getUserData('slackId', obj.slackUserId).then((user) => {
                  slackReqObj.username = user.username;
                  slackReqObj.actionParams = JSON.parse(obj.actionParams);
                  webhooksHandler[`${obj.actionApi}Action`][obj.actionFunction](slackReqObj);
                  callback();
                }).catch((error) => { console.log('error Slack action post_message', error); });
              }
            }
          } else {
            callback();
          }
        }, (error) => { error ? console.log(error) : console.log('All actions shot triggered by Slack Event:', req.body.event.type); });
      }).catch((error) => {
        res.status(500).send('Server Error in Slack trigger');
        console.log(error);
      });

        // extract actions if trigger is right
        // use async.parallel webhooksHandler[api + Action][action](parameters) to shoot the actions
    } else {
      res.status(200).send('A problem occurred while processing event');
    }
  },
  actions: {
    post_message: (paramObj) => {
      userCtrl.getUserData('username', paramObj.username).then((user) => {
        const token = undefined || require('./../../../../env.js').slackAppToken; // replace undefined by user.slackToken
        let channel = encodeURIComponent(paramObj.actionParams.channelName);
        let message = encodeURIComponent(paramObj.actionParams.text);
        request(`https://slack.com/api/chat.postMessage?token=${token}&channel=${channel}&text=${message}&as_user=true`);
        console.log('slack message posted to channel: ' + paramObj.actionParams.channelName + ' from user: ' + user.username);
      }).catch((error) => { console.log('error in slack action post_message:', error); });
    },
  },
};
