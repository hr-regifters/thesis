const async = require('async');
// const evernoteCollection = require('./../../../db/models/evernoteModel')

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    if (req.body.type === 'url_verification') {
      res.json({ challenge: req.body.challenge });
    } else {
      res.status(200).send('registered evernote event');
    }
    console.log('shoot actions after evernote trigger');
    // fetch db data for users to get actions
    // extract actions if trigger is right
    // use async.parallel webhooksHandler[api + Action][action](parameters) to shoot the actions
  },
  actions: {
    post: (params) => {
      setTimeout(() => console.log('evernote post function performed', params.actionParams), 200);
    },
    delete: (params) => {
      console.log('evernote delete function performed', params.actionParams);
    },
  },
};
