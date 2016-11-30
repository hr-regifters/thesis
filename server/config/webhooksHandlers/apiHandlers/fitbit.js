"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const slackCtrl = require('../../../db/controllers/slackController');
const userCtrl = require('../../../db/controllers/userController');
const request = require('request');
const verificationCode = '35b7e7f737cd9d2392c59413ddc5064e09f19b57d8d3998988fab2c66fb01f99';
const listenTo = {
  file_created: true,
  pin_added: true,
};


module.exports = {
  trigger: (req, res) => {
    res.status(204).send();
    const body = req.body
    console.log(req.body);
    async.each(body, (obj, callback) => {
      //get all concoctions where user id and event
      concCtrl.getConcoctions('fitbit', obj['collectionType'], obj['ownerId']).then((rows) => {
        if(rows.length) {
          console.log(rows);
      //query endpoint for update information
          let options = {
            uri: 'https://api.fitbit.com/1/user/' + obj['ownerId'] + '/' + obj['collectionType'] + '/date/' + obj['date'] + '.json',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${rows[0].triggertoken}`
            }
        }
        request.get(options, function(err, body, response) {
            console.log(err, 'err')
            console.log(response, 'response');
            console.log(body, 'body');
        })

      }
      //iterate over concoctions to see if conditions are met

      
      })
    })
    //iterate over each object in the array
    //query fitbit endpoint
    //check to see if conditions are met
    //execute action

    // const webhooksHandler = require('./../main');
    // const currentTime = Number(new Date());
    // if (collectionType === "activities") {
    //   let options = {
    //       uri: 'https://api.fitbit.com/1/user/' + userId + '/activites/date/today.json',
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${fitbitData.user[0]}`
    //       },
    //     }
    // }
    // concCtrl.getConcoctions('fitbit', collectionType)
    // concCtrl.getConcoctions('slack', req.body.event.type).then((arr) => {
    //   async.each(arr.rows, (obj, callback) => {
    //     if (obj.enable && req.body['authed_users'].indexOf(obj.triggeruserid) !== -1) {
    //       if (obj.actionapi === undefined || obj.actionevent === undefined) {
    //         console.log(`PLEASE FIX! actiionApi or actionFunction undefined for slackUserId: ${obj.triggeruserid}`);
    //         callback();
    //       } else {
    //         if (req.body.event.type === 'file_created' && obj.actionapi === 'evernote' && obj.actionevent === 'post_note') {
    //           slackCtrl.getFile(req.body.event.file_id)
    //           .then((file) => {
    //             slackReqObj.title = file.title;
    //             if (file.mimetype.slice(0, 5) === 'image') {
    //               slackReqObj.images = [file.url_private];
    //             }
    //             slackReqObj.links = [file.url_private];
    //             slackReqObj.body = new Date(file.timestamp * 1000).toString();
    //             slackReqObj.tagNames = ['Slack', 'Upload'];
    //             slackReqObj.slackUserId = obj.triggeruserid;
    //             slackReqObj.actionParams = JSON.parse(obj.actionparams);
    //             slackReqObj.actionToken = obj.actiontoken;
    //             webhooksHandler[`${obj.actionapi}Action`][obj.actionevent](slackReqObj);
    //             callback();
    //           }).catch((error) => { console.log('Error in file_created and evernote post_note action: ', error); });
    //         } else if (req.body.event.type === 'pin_added' && obj.actionapi === 'evernote' && obj.actionevent === 'post_note') {
    //           if (req.body.event.item.type === 'file') {
    //             slackCtrl.getFile(req.body.event.item.file_id)
    //             .then((file) => {
    //               slackReqObj.title = file.title;
    //               if (file.mimetype.slice(0, 5) === 'image') {
    //                 slackReqObj.images = [file.url_private];
    //               }
    //               slackReqObj.links = [file.url_private];
    //               slackReqObj.body = new Date(file.timestamp * 1000).toString();
    //               slackReqObj.tagNames = ['Slack', 'Pin'];
    //               slackReqObj.slackUserId = obj.triggeruserid;
    //               slackReqObj.actionParams = JSON.parse(obj.actionparams);
    //               slackReqObj.actionToken = obj.actiontoken;
    //               webhooksHandler[`${obj.actionapi}Action`][obj.actionevent](slackReqObj);
    //               callback();
    //             }).catch((error) => { console.log('Error in pin_added file and evernote post_note action: ', error); });
    //           } else if (req.body.event.item.type === 'message') {
    //             const msg = req.body.event.item.message;
    //             slackReqObj.title = msg.text.split(' ').slice(0,3).join(' ') + '...';
    //             slackReqObj.links = [msg.permalink];
    //             slackReqObj.body = new Date(req.body.event.item.created * 1000).toString() + '<br/>' + '<br/>' + msg.text;
    //             slackReqObj.tagNames = ['Slack', 'Pin'];
    //             slackReqObj.slackUserId = obj.triggeruserid;
    //             slackReqObj.actionParams = JSON.parse(obj.actionparams);
    //             slackReqObj.actionToken = obj.actiontoken;
    //             webhooksHandler[`${obj.actionapi}Action`][obj.actionevent](slackReqObj);
    //             callback();
    //           }
    //         } else if (obj.actionapi === 'slack' && obj.actionevent === 'post_message') {
    //           userCtrl.getUserData('slackId', obj.triggeruserid).then((user) => {
    //             slackReqObj.username = user.username;
    //             slackReqObj.actionParams = JSON.parse(obj.actionparams);
    //             slackReqObj.actionToken = obj.actiontoken;
    //             webhooksHandler[`${obj.actionapi}Action`][obj.actionevent](slackReqObj);
    //             callback();
    //           }).catch((error) => { console.log('error Slack action post_message', error); });
    //         } else if (obj.actionapi === 'twilio' && obj.actionevent === 'send_text') {
    //           slackReqObj = JSON.parse(obj.actionparams);
    //           webhooksHandler[`${obj.actionapi}Action`][obj.actionevent](slackReqObj);
    //           callback();
    //         }
    //       }
    //     } else {
    //       callback();
    //     }
    //   }, (error) => { error ? console.log(error) : console.log('All actions shot triggered by Slack Event:', req.body.event.type); });
    // }).catch((error) => {
    //   res.status(500).send('Server Error in Slack trigger');
    //   console.log(error);
    // });
  },
  verify: (req, res) => {
    console.log(req.params, 'req.params');
    console.log(req.query, 'req.query');
    let query = req.query.verify;
    console.log(query, 'query');
    if(query == verificationCode) {
      res.status(204).send('works');
    } else {
      res.status(404).send('does not work');
    }
  }
}