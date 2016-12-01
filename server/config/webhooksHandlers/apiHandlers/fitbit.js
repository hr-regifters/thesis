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
    const webhooksHandler = require('./../main');
    let fitbitReqObj = {
      actionParams: '',
      actionToken: ''
    };
    console.log('inside trigger')
    // look at each webhook from fitbit
    async.each(req.body, (obj, callback) => {

      // check obj.collectionType and connect it with the corresponding triggerevent
      let alias;
      if (obj.collectionType === 'activities') {
        alias = 'activity_logged';
      }
      console.log('inside async', alias)
      // get all concoctions that match fitbit id and webhook event
      concCtrl.getConcoctions('fitbit', alias, obj['ownerId']).then((concoctionList) => {
        let concoctions = concoctionList.rows;
        console.log('inside db query', concoctions)
        // filter concoctions based on whether they are enabled or not
        concoctions = concoctions.filter((concoction) => concoction.enable === true);
        let options = {
          uri: `https://api.fitbit.com/1/user/${obj['ownerId']}/${obj['collectionType']}/date/${obj['date']}.json`,
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${concoctions[0].triggertoken}`
          }
        };
        console.log('about to query Fibit', options);
        // query endpoint for update information
        request.get(options, (err, res, body) => {
          if (err) {
            console.log('err', err);
          } else {
            // look at each individual concoction
            concoctions.forEach((concoction) => {
              let fitbitData = body;
              fitbitReqObj.actionParams = JSON.parse(concoction.actionparams);
              fitbitReqObj.actionToken = concoction.actiontoken;
              console.log('received fitbit data', body, typeof body)

              // check if we're dealing with activities
              if (fitbitData.hasOwnProperty('activities')) {
                let activitiesData = fitbitData.activities;
                let activity = JSON.parse(concoction.triggerparams).param['fitbit_activity'].toLowerCase();

                // filter activites data based on activity user has specified
                let activityData = activitiesData.filter((event) => event.name.toLowerCase() === activity);
                console.log('filtered activity data', activity);

                // keep track of activity id? since we get all activity events everytime

                // check which action apis we're dealing with and what corresponding action
                if (concoction.actionapi === 'googleSheets' && concoction.actionevent === 'create_sheet') {
                  let sheetData = activityData;
                  fitbitReqObj.data = sheetData;
                  console.log('fitbit obj', fitbitReqObj);
                  webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](fitbitReqObj);
                  callback();
                } else {
                  callback();
                }
              }
            });
          }
        });
      }).catch((error) => {
        res.status(500).send('Server Error in Fitbit trigger');
        console.log(error);
      });
    }, (error) => { error ? console.log(error) : console.log('All actions shot triggered by Fitbit Event:', req.body[0].collectionType); }); //closing async
  },
}
