"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const slackCtrl = require('../../../db/controllers/slackController');
const userCtrl = require('../../../db/controllers/userController');
const request = require('request');
const verificationCode = process.env.FITBIT_VERIFICATION || require('../../../env.js').FITBIT_VERIFICATION;

module.exports = {
  verify: (req, res) => {
    let query = req.query.verify;
    if (query === verificationCode) {
      res.status(204).send('app verified by fitbit');
    } else {
      res.status(404).send('app not verified by fitbit');
    }
  },
  trigger: (req, res) => {
    res.status(204).send();
    const body = req.body
    console.log(req.body, typeof req.body);
    console.log(req.body[0]);
    async.each(body, (obj, callback) => {
      //get all concoctions where user id and event
      console.log('inside async');
      concCtrl.getConcoctions('fitbit', 'activity_logged' , obj['ownerId']).then((concoction) => {
        if (concoction.enable && concoction.rows.length) {
          console.log(concoction.rows);
          //query endpoint for update information
          let options = {
            uri: 'https://api.fitbit.com/1/user/' + obj['ownerId'] + '/' + obj['collectionType'] + '/date/' + obj['date'] + '.json',
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${concoction.rows[0].triggertoken}`
            }
          }
          request.get(options, function(err, body, response) {
            console.log(err, 'err')
            console.log(response, 'response');
            console.log(body, 'body');
          });
        }
      }).catch((err) => { console.log(err, 'err'); });
    });
  },
}
