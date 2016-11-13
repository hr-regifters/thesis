const async = require('async');
const webhooksHandler = require('./../main');
const evernote = require('./evernote');
// const slackCollection = require('./../../../db/models/slackModel')

module.exports = {
  trigger: (req, res) => {
    if (req.body.type === 'url_verification') {
      res.json({ challenge: req.body.challenge });
    } else {
      res.status(200).send('registered slack event');
    }
    console.log('shoot actions after slack trigger');
    // fetch db data for users to get actions
    // extract actions if trigger is right
    console.log(webhooksHandler);
    webhooksHandler['evernoteAction']['post']('hello from slack event');
    // use async.parallel webhooksHandler[api + Action][action](parameters) to shoot the actions
  },
  actions: {

  },
};
