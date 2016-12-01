"use strict"
const async = require('async');
const instaCtrl = require('../../../db/controllers/instagramController');
const userCtrl = require('../../../db/controllers/userController');
const concCtrl = require('../../../db/controllers/concoctionController');
const clientId = process.env.INSTA_ID || require('./../../../../env').INSTA_ID;
const secret = process.env.INSTA_SECRET || require('./../../../../env').INSTA_SECRET;
const verifyToken = process.env.INSTA_VERIFYTOKEN || require('./../../../../env').INSTA_VERIFYTOKEN;

const aliases = {
  media: 'picture_uploaded',
};

module.exports = {
  validate: (req, res) => {
    req.query['hub.verify_token'] === verifyToken && req.query['hub.mode'] === 'subscribe' ? res.status(200).send(req.query['hub.challenge']) : res.status(404).send('wrong verification credentials');
  },
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    const currentTime = Number(new Date());
    /*
    [ { changed_aspect: 'media',
         object: 'user',
         object_id: '4210173738',
         time: 1480465775,
         subscription_id: 0,
         data: { media_id: '1394570434339769908_4210173738' } } ]
    */
    // //fetch picture
    //   userCtrl.getUserData('instagramid', req.body[0]['object_id'])
    //   .then((userObj) => {
    //     console.log(userObj);
    //     return instaCtrl.getFile(req.body[0].data['media_id'], userObj.instagramtoken);
    //   })
    //   .then((fileObj) => {
    //     console.log('File result: ', fileObj);
    //   })
    //   .catch( error => console.log('error in fetching insta media: ', error));
    if (req.body[0].time * 1000 <= currentTime && req.body[0].time * 1000 >= currentTime - 10800000) {
      res.status(200).send('registered instagram event');
      let instaReqObj = {
        actionParams: '',
        actionToken: '',
      };
      const alias = aliases[req.body[0]['changed_aspect']];
      concCtrl.getConcoctions('instagram', alias).then((arr) => {
        console.log(arr);
        async.each(arr.rows, (obj, callback) => {
          if (obj.enable && req.body[0]['object_id'] === obj.triggeruserid) {
            if (obj.actionapi === undefined || obj.actionevent === undefined) {
              console.log(`PLEASE FIX! actiionapi or actionevent undefined for InstagramId: ${obj.triggeruserid}`);
              callback();
            } else {
              if (alias === 'picture_uploaded' && obj.actionapi === 'evernote' && obj.actionevent === 'create_note') {
                userCtrl.getUserData('instagramid', req.body[0]['object_id'])
                .then((userObj) => {
                  console.log(userObj);
                  return instaCtrl.getFile(req.body[0].data['media_id'], userObj.instagramtoken);
                })
                .then((file) => {
                  console.log('File result: ', file);
                  if (file.type === 'image') {
                    console.log('posting insta picture to evernote');
                    instaReqObj.title = file.caption.text.split(' ').slice(0,2).join(' ');
                    instaReqObj.images = [file.images['standard_resolution'].url];
                    instaReqObj.links = [];
                    instaReqObj.body = new Date(req.body[0].time * 1000).toString() + '<br/>' + '<br/>' + file.caption.text;
                    instaReqObj.tagNames = file.tags;
                    instaReqObj.slackUserId = obj.triggeruserid;
                    instaReqObj.actionParams = JSON.parse(obj.actionparams);
                    instaReqObj.actionToken = obj.actiontoken;
                    webhooksHandler[`${obj.actionapi}Action`][obj.actionevent](instaReqObj);
                    callback();
                  } else {
                    callback();
                  }
                })
                .catch((error) => { console.log('Error in picture_uploaded and evernote create_note action: ', error); });
              } else if (obj.actionapi === 'slack' && obj.actionevent === 'post_message') {
                userCtrl.getUserData('instagramid', obj.triggeruserid).then((user) => {
                  instaReqObj.username = user.username;
                  instaReqObj.actionParams = JSON.parse(obj.actionparams);
                  instaReqObj.actionToken = obj.actiontoken;
                  webhooksHandler[`${obj.actionapi}Action`][obj.actionevent](instaReqObj);
                  callback();
                }).catch((error) => { console.log('error Slack action post_message', error); });
              } else if (obj.actionapi === 'twilio' && obj.actionevent === 'send_text') {
                instaReqObj.actionParams = JSON.parse(obj.actionparams);
                webhooksHandler[`${obj.actionapi}Action`][obj.actionevent](instaReqObj);
                callback();
              } else if (obj.actionapi === 'googleMail' && obj.actionevent === 'send_email') {
                instaReqObj.actionToken = obj.actiontoken;
                instaReqObj.actionParams = JSON.parse(obj.actionparams); // To, From, Message
                webhooksHandler[`${obj.actionapi}Action`][obj.actionevent](instaReqObj);
                callback();
              }
            }
          } else {
            callback();
          }
        }, (error) => { error ? console.log(error) : console.log('All actions shot triggered by Instagram Event:', alias); });
      });
    } else {
      res.status(200).send('A problem occurred while processing instagram event');
    }
  },
  actions: {

  },
};
