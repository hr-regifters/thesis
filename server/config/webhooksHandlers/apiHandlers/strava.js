"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const slackCtrl = require('../../../db/controllers/slackController');
const userCtrl = require('../../../db/controllers/userController');
const request = require('request');
const verificationCode = '6b6461bd16389838c770bc3ec1701c4d6ee8ec2b26fc2839e0599cd0221419d7';
const listenTo = {
  file_created: true,
  pin_added: true,
};


module.exports = {
  verify: (req, res) => {
  console.log(req.params, 'req.params');
  console.log(req.query, 'req.query');
  console.log(req.body, 'req.body');
  let query = {'hub.challenge' : req.query['hub.challenge']};
  console.log(query, 'query');
    res.status(200).send(query);
  },

  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    let fitbitReqObj = {
      actionParams: '',
      actionToken: ''
    };
    let obj = req.body;
    res.status(200).send();
    concCtrl.getConcoctions('strava', 'activity_logged', obj['ownerId']).then((concoctionlist) => {
      console.log(concoctionlist.rows, 'concoctionlist.rows');
      let concoctions = concoctionlist.rows;
      let options = {
        url: `https://www.strava.com/api/v3/activities/${obj['object_id']}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${concoctions[0].triggertoken}`
        }
      };
      // query endpoint for update information
      request(options, (err, res, body) => {
        console.log(body, 'body');
        console.log(err, 'err');
      })
    })
  }
}