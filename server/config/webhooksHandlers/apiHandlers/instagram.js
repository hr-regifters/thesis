"use strict"
const async = require('async');
const instaCtrl = require('../../../db/controllers/instagramController');
const concCtrl = require('../../../db/controllers/concoctionController');
const verifyToken = process.env.INSTA_VERIFYTOKEN || require('./../../../../env').INSTA_VERIFYTOKEN;

const webhooks = {
  media: 'picture_uploaded',
};

module.exports = {
  validate: (req, res) => {
    req.query['hub.verify_token'] === verifyToken && req.query['hub.mode'] === 'subscribe' ? res.status(200).send(req.query['hub.challenge']) : res.status(404).send('wrong verification credentials');
  },
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');

    // make sure we don't get events older than 3 hrs (including fake events)
    const currentTime = Number(new Date());
    if (req.body[0].time * 1000 <= currentTime && req.body[0].time * 1000 >= currentTime - 10800000) {
      res.status(200).send('registered Instagram event');
      let instaReqObj = {
        actionParams: '',
        actionToken: '',
      };

      // check changed_aspect and connect it with the corresponding triggerevent
      const alias = webhooks[req.body[0]['changed_aspect']];

      // get all concoctions that match webhook event
      concCtrl.getConcoctions('instagram', alias).then((concoctionList) => {

        // look at each individual concoction and fire action
        async.each(concoctionList.rows, (concoction, callback) => {

          // check is concoction is enabled
          if (concoction.enable && req.body[0]['object_id'] === concoction.triggeruserid) {
            if (concoction.actionapi === undefined || concoction.actionevent === undefined) {
              console.log(`PLEASE FIX! actiionapi or actionevent undefined for InstagramId: ${concoction.triggeruserid}`);
              callback();
            } else {
              instaReqObj.actionParams = JSON.parse(concoction.actionparams);
              instaReqObj.actionToken = concoction.actiontoken;

              // check which action apis we're dealing with and the corresponding action
              if (alias === 'picture_uploaded' && concoction.actionapi === 'evernote' && concoction.actionevent === 'create_note') {
                // query instagram endpoint for update information
                instaCtrl.getFile(req.body[0].data['media_id'], concoction.triggertoken)
                .then((file) => {
                  // save image to evernote
                  if (file.type === 'image') {
                    instaReqObj.title = file.caption.text.split(' ').slice(0,2).join(' ');
                    instaReqObj.images = [file.images['standard_resolution'].url];
                    instaReqObj.links = [];
                    instaReqObj.body = new Date(req.body[0].time * 1000).toString() + '<br/>' + '<br/>' + file.caption.text;
                    instaReqObj.tagNames = file.tags;
                    instaReqObj.slackUserId = concoction.triggeruserid;
                    webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](instaReqObj);
                    callback();
                  } else {
                    callback();
                  }
                })
                .catch((error) => { console.log('Error in picture_uploaded and evernote create_note action: ', error); });

              } else if (concoction.actionapi === 'slack' && concoction.actionevent === 'post_message') {
                webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](instaReqObj);
                callback();

              } else if (concoction.actionapi === 'twilio' && concoction.actionevent === 'send_text') {
                webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](instaReqObj);
                callback();

              } else if (concoction.actionapi === 'googleMail' && concoction.actionevent === 'send_email') {
                webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](instaReqObj);
                callback();

              }
            }
          } else {
            callback();
          }
        }, (error) => { error ? console.log(error) : console.log('All actions shot triggered by Instagram Event:', alias); });
      });
    } else {
      res.status(200).send('A problem occurred while processing Instagram event');
    }
  },
  actions: {
  },
};
