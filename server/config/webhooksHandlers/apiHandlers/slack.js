const async = require('async');
// const slackCollection = require('./../../../db/models/slackModel')

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    if (req.body.type === 'url_verification') {
      res.json({ challenge: req.body.challenge });
    } else {
      res.status(200).send('registered slack event');
    }
    console.log('shoot actions after slack trigger');
    // fetch db data for users to get actions
    // extract actions if trigger is right
    console.log(webhooksHandler);
    async.parallel([webhooksHandler['evernoteAction']['post'], webhooksHandler['evernoteAction']['delete']], (err, results) => {
      console.log('results: ', results);
    });
    // use async.parallel webhooksHandler[api + Action][action](parameters) to shoot the actions
  },
  actions: {

  },
};
