"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const slackCtrl = require('../../../db/controllers/slackController');
const listenTo = {
  file_created: true
};

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    if (req.body.type === 'url_verification') {
      res.json({ challenge: req.body.challenge });
    } else if (listenTo[req.body.event.type]) {
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
      concCtrl.getSlackEvent(req.body.event.type).then((arr) => {
        async.each(arr, (obj, callback) => {
          if (req.body['authed_users'].indexOf(obj.slackUserId) !== -1) {
            if (obj.actionApi === undefined || obj.actionFunction === undefined) { // check for additional things like token, api_app_id, timestamp
              callback('error! actionApi or actionFunction property not existing');
            } else {
              if (req.body.event.type === 'file_created' && obj.actionApi === 'evernote' && obj.actionFunction === 'postNote') {
                slackCtrl.getFile(req.body['authed_users'][0], req.body.event.file_id)
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
                }).catch((error) => { console.log('Error in file_created and evernote postNote action: ', error); });
              }
            }
          } else {
            callback();
          }
        }, (error) => { error ? console.log(error) : console.log('All actions shot triggered by Slack Event:', req.body.event.type); });
      }).catch((error) => { console.log(error); });

        // extract actions if trigger is right
        // use async.parallel webhooksHandler[api + Action][action](parameters) to shoot the actions
    } else {
      res.status(200).send('Event type unknown');
    }
  },
  actions: {

  },
};
