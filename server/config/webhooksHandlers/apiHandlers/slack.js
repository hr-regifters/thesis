"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const slackCtrl = require('../../../db/controllers/slackController');
const slackWebhookId = process.env.slackWebhookId || require('./../../../../env').slackWebhookId;
const slackWebhookToken = process.env.slackWebhookToken || require('./../../../../env').slackWebhookToken;
const request = require('request');

const listenTo = {
  file_created: true,
  pin_added: true,
};

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');

    // make sure we don't get events older than 3 hrs (including fake events)
    const currentTime = Number(new Date());
    if (req.body.type === 'url_verification') {
      res.json({ challenge: req.body.challenge });
    } else if (listenTo[req.body.event.type] && req.body.event['event_ts'] * 1000 > currentTime - 10800000
      && req.body.event.event_ts * 1000 < currentTime && req.body.token === slackWebhookToken
      && req.body.api_app_id === slackWebhookId) { // check gating credentials (timestamp max age 3hrs)
      res.status(200).send('registered slack event');
      let slackReqObj = {
        actionParams: '',
        actionToken: '',
      };

      // get all concoctions that match webhook event
      concCtrl.getConcoctions('slack', req.body.event.type).then((concoctionList) => {

        // look at each individual concoction and fire action
        async.each(concoctionList.rows, (concoction, callback) => {

          // check is concoction is enabled
          if (concoction.enable && req.body['authed_users'].indexOf(concoction.triggeruserid) !== -1) {
            if (concoction.actionapi === undefined || concoction.actionevent === undefined) {
              console.log(`PLEASE FIX! actiionapi or actionevent undefined for slackUserId: ${concoction.triggeruserid}`);
              callback();
            } else {
              slackReqObj.actionParams = JSON.parse(concoction.actionparams);
              slackReqObj.actionToken = concoction.actiontoken;

              // check which action apis we're dealing with and the corresponding action
              if (req.body.event.type === 'file_created' && concoction.actionapi === 'evernote' && concoction.actionevent === 'create_note') {
                // query slack endpoint for update information
                slackCtrl.getFile(req.body.event.file_id)
                .then((file) => {
                  // save image to evernote
                  slackReqObj.title = file.title;
                  if (file.mimetype.slice(0, 5) === 'image') {
                    slackReqObj.images = [file.url_private];
                  }
                  slackReqObj.links = [file.url_private];
                  slackReqObj.body = new Date(file.timestamp * 1000).toString();
                  slackReqObj.tagNames = ['Slack', 'Upload'];
                  slackReqObj.slackUserId = concoction.triggeruserid;
                  webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](slackReqObj);
                  callback();
                }).catch((error) => { console.log('Error in file_created and evernote create_note action: ', error); });

              } else if (req.body.event.type === 'pin_added' && concoction.actionapi === 'evernote' && concoction.actionevent === 'create_note') {
                // handles FILES that are pinned
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
                    slackReqObj.slackUserId = concoction.triggeruserid;
                    webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](slackReqObj);
                    callback();
                  }).catch((error) => { console.log('Error in pin_added file and evernote create_note action: ', error); });

                // handles TEXT that are pinned
                } else if (req.body.event.item.type === 'message') {
                  const msg = req.body.event.item.message;
                  slackReqObj.title = msg.text.split(' ').slice(0,3).join(' ') + '...';
                  slackReqObj.links = [msg.permalink];
                  slackReqObj.body = new Date(req.body.event.item.created * 1000).toString() + '<br/>' + '<br/>' + msg.text;
                  slackReqObj.tagNames = ['Slack', 'Pin'];
                  slackReqObj.slackUserId = concoction.triggeruserid;
                  webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](slackReqObj);
                  callback();
                }

              } else if (concoction.actionapi === 'slack' && concoction.actionevent === 'post_message') {
                webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](slackReqObj);
                callback();

              } else if (concoction.actionapi === 'twilio' && concoction.actionevent === 'send_text') {
                webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](slackReqObj);
                callback();

              } else if (concoction.actionapi === 'googleMail' && concoction.actionevent === 'send_email') {
                webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](slackReqObj);
                callback();
                
              } else if (concoction.actionapi === 'googleSheets' && concoction.actionevent === 'create_sheet') {
                webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](slackReqObj);
                callback();
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
    } else {
      res.status(200).send('A problem occurred while processing slack event');
    }
  },
  actions: {
    post_message: (paramObj) => {
      const token = process.env.slackAppToken || require('./../../../../env.js').slackAppToken; // replace process.env.slackAppToken by user.slackToken
      let channel = encodeURIComponent(paramObj.actionParams.channelName);
      let message = encodeURIComponent(paramObj.actionParams.slack_text);
      request(`https://slack.com/api/chat.postMessage?token=${token}&channel=${channel}&text=${message}&as_user=true`,
        (err, res, body) => {
          if (err) {
            console.log(err);
          } else {
            console.log('slack message posted to channel: ' + paramObj.actionParams.channelName + ' from user: ' + paramObj.username);
          }
        }
      );
    },
  },
};
