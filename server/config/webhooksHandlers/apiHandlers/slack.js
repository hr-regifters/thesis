const async = require('async');
// const slackCtrl = require('./../../../db/models/slack');
// const slackCollection = require('./../../../db/models/slackModel');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    if (req.body.type === 'url_verification') {
      res.json({ challenge: req.body.challenge });
    } else {
      res.status(200).send('registered slack event');
    }
    // fetch db data for users to get actions
    // slackCtrl.getEvent(req.body.event.type).then((arr) => {
      arr = [{api: 'evernote', action:'post', slackId: 'U061F7AUR', params: 'post this shit 1'},
             {api: 'evernote', action:'delete', slackId: 'U061F7AUR', params: 'delete first 2'},
             {api: 'evernote', action:'post', slackId: 'U061FAUR', params: 'shouldnt occur'}];
      async.each(arr, (obj, callback) => {
        if (req.body['authed_users'].includes(obj.slackId)) {
          if (obj.api === undefined || obj.action === undefined) {
            callback('error! api or action property not existing');
          } else {
            webhooksHandler[`${obj.api}Action`][obj.action](obj.params);
            callback();
          }
        } else {
          callback();
        }
      }, (error) => { error !== null ? console.log(error) : console.log('slack event successfully processed'); });
    // }).catch((error) => { console.log(error); });

    // extract actions if trigger is right
    // use async.parallel webhooksHandler[api + Action][action](parameters) to shoot the actions
  },
  actions: {

  },
};
