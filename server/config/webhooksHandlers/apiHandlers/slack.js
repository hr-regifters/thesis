"use strict"
const async = require('async');
// const slackCtrl = require('../../../db/models/slack');
const concCtrl = require('../../../db/controllers/concoctionController');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    if (req.body.type === 'url_verification') {
      res.json({ challenge: req.body.challenge });
    } else {
      res.status(200).send('registered slack event');
    }
    
    let slackReqObj = {
      userId: '',
      title: '',
      body: '',
      links: [],
      images: [],
      tagNames: [],
      actionParams: '',
    };

    if (req.body.event.type === 'file_created') {
      slackReqObj.title = 'Upload from Slack';
      slackReqObj.images = [req.body.event.file.permalink];
      slackReqObj.body = new Date(req.body.event.file.timestamp * 1000).toString();
      slackReqObj.tagNames = ['Slack', 'Upload'];
    }


    // fetch db data for users to get actions
    concCtrl.getSlackEvent(req.body.event.type).then((arr) => {
      // arr = [{actionApi: 'evernote', actionFunction:'post', slackUserId: 'U061F7AUR', actionParams: 'post this shit 1'},
      //        {actionApi: 'evernote', actionFunction:'delete', slackUserId: 'U061F7AUR', actionParams: 'delete first 2'},
      //        {actionApi: 'evernote', actionFunction:'post', slackUserId: 'U061FAUR', actionParams: 'shouldnt occur'}];
      async.each(arr, (obj, callback) => {
        if (req.body['authed_users'].includes(obj.slackUserId)) {
          if (obj.actionApi === undefined || obj.actionFunction === undefined) {
            callback('error! actionApi or actionFunction property not existing');
          } else {
            slackReqObj.actionParams = obj.actionParams;
            webhooksHandler[`${obj.actionApi}Action`][obj.actionFunction](slackReqObj);
            callback();
          }
        } else {
          callback();
        }
      }, (error) => { error ? console.log(error) : console.log('slack event successfully processed'); });
    }).catch((error) => { console.log(error); });

    // extract actions if trigger is right
    // use async.parallel webhooksHandler[api + Action][action](parameters) to shoot the actions
  },
  actions: {

  },
};
