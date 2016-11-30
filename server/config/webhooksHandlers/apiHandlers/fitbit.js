"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const slackCtrl = require('../../../db/controllers/slackController');
const userCtrl = require('../../../db/controllers/userController');
const request = require('request');
const verificationCode = process.env.FITBIT_VERIFICATION || require('../../../../env.js').FITBIT_VERIFICATION;

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
    let fitbitReqObj = {
      actionParams: '',
      actionToken: ''
    };
    async.each(req.body, (obj, callback) => {
      //get all concoctions where user id and event
      concCtrl.getConcoctions('fitbit', obj.collectionType, obj['ownerId']).then((concoctionList) => {
        let concoctions = concoctionList.rows;
        //query endpoint for update information
        let options = {
          uri: `https://api.fitbit.com/1/user/${obj['ownerId']}/${obj['collectionType']}/date/${obj['date']}.json`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${concoctions[0].triggertoken}`
          }
        };
        request.get(options, (err, res, body) => {
          if (err) {
            console.log('err', err);
          } else {
            return JSON.parse(res.body).activities;
          }
        })
        .then((activitiesData) => {
          concoctions = concoctions.filter((concoction) => concoction.enable === true);
          console.log('filtered concoctions', concoctions);
          console.log(activitiesData);
          concoctions.forEach((concoction) => {
            let activity = concoction.triggerparams.param.activity.toLowerCase();
            let activityData = activitiesData.filter((event) => event.name.toLowerCase() === activity);
            console.log('filtered activity data', activityData);
            fitbitReqObj.actionParams = JSON.parse(concoction.actionparams);
            fitbitReqObj.actionToken = concoction.actiontoken;
            if (data.hasOwnProperty('activities') && obj.actionapi === 'googleSheets' && obj.actionevent === 'create_sheet') {
              let sheetData = data.filter((activity) => activity.name.toLowerCase() === fitbitReqObj.actionParams.param.activity.toLowerCase());
              fitbitReqObj.data = sheetData;
              console.log('fitbit obj', fitbitReqObj);
              webhooksHandler[`${obj.actionapi}Action`][obj.actionevent](fitbitReqObj);
              callback();
            } else {
              callback();
            }
          });
        }).catch((err) => { console.log('err', err); });
      }).catch((err) => { console.log('err', err); });
    });
  },
}
