"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const slackCtrl = require('../../../db/controllers/slackController');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    if (req.body.type === 'url_verification') {
      res.json({ challenge: req.body.challenge });
    } else {
      res.status(200).send('registered slack event');
      const slackId = req.body['authed_users'][0];
      const fileId = req.body.event.file_id;
      slackCtrl.getFile(slackId, fileId)
      .then((file) => {

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
        concCtrl.getSlackEvent(req.body.event.type).then((arr) => {
          async.each(arr, (obj, callback) => {
            if (req.body['authed_users'].indexOf(obj.slackUserId) !== -1) {
              if (obj.actionApi === undefined || obj.actionFunction === undefined) { // check for additional things like token, api_app_id, timestamp
                callback('error! actionApi or actionFunction property not existing');
              } else {
                if (req.body.event.type === 'file_created' && obj.actionApi === 'evernote' && obj.actionFunction === 'postNote') {
                  slackReqObj.title = file.title;
                  if (file.mimetype.slice(0, 5) === 'image') {
                    slackReqObj.images = [file.url_private];
                  } else {
                    slackReqObj.links = [file.url_private];
                  }
                  slackReqObj.body = new Date(file.timestamp * 1000).toString();
                  slackReqObj.tagNames = ['Slack', 'Upload'];
                }
                slackReqObj.slackUserId = obj.slackUserId;
                slackReqObj.actionParams = obj.actionParams;
                webhooksHandler[`${obj.actionApi}Action`][obj.actionFunction](slackReqObj);
                callback();
              }
            } else {
              callback();
            }
          }, (error) => { error ? console.log(error) : false; });
        }).catch((error) => { console.log(error); });

        // extract actions if trigger is right
        // use async.parallel webhooksHandler[api + Action][action](parameters) to shoot the actions

      });
    }
  },
  actions: {

  },
};
