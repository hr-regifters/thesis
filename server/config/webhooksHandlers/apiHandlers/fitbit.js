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
    console.log(req.body, typeof req.body);
    console.log(req.body[0]);
    let fitbitReqObj = {
      actionParams: '',
      actionToken: ''
    };
    async.each(req.body, (obj, callback) => {
      //get all concoctions where user id and event
      concCtrl.getConcoctions('fitbit', obj.collectionType, obj['ownerId']).then((concoction) => {
        console.log('concoction', concoction);
        console.log('concoction enable', concoction.enable);
        console.log('concoction rows', concoction.rows);
        if (concoction.enable && concoction.rows.length) {
          //query endpoint for update information
          let options = {
            uri: `https://api.fitbit.com/1/user/${obj['ownerId']}/${obj['collectionType']}/date/${obj['date']}.json`,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${concoction.rows[0].triggertoken}`
            }
          };
          request.get(options, (err, res, body) => {
            if (err) {
              console.log('err', err);
            } else {
              return JSON.parse(res.body);
            }
          })
          .then((data) => {
            if (data.hasOwnProperty('activities') && obj.actionapi === 'googleSheets' && obj.actionevent === 'create_sheet') {
              fitbitReqObj.actionParams = JSON.parse(concoction.actionparams);
              fitbitReqObj.actionToken = concoction.actiontoken;
              let sheetData = data.filter((activity) => activity.name.toLowerCase() === fitbitReqObj.actionParams.param.activity.toLowerCase());
              fitbitReqObj.data = sheetData;
              console.log('fitbit obj', fitbitReqObj);
              webhooksHandler[`${obj.actionapi}Action`][obj.actionevent](fitbitReqObj);
              callback();
            }
          }).catch((err) => { console.log('err', err); });
        } else {
          callback();
        }
      }).catch((err) => { console.log('err', err); });
    });
  },
}
