"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const request = require('request');
const verificationCode = process.env.FITBIT_VERIFICATION || require('../../../../env.js').FITBIT_VERIFICATION;

const webhooks = {
  'activities': 'activity_logged'
};

module.exports = {
  validate: (req, res) => {
    let query = req.query.verify;
    if (query === verificationCode) {
      res.status(204).send('app verified by fitbit');
    } else {
      res.status(404).send('app not verified by fitbit');
    }
  },
  trigger: (req, res) => {
    res.status(204).send();
    const webhooksHandler = require('./../main');
    let fitbitReqObj = {
      actionParams: '',
      actionToken: ''
    };
    
    // look at each webhook from fitbit
    async.each(req.body, (obj, callback) => {

      // check obj.collectionType and connect it with the corresponding triggerevent
      let alias = webhooks[obj.collectionType];

      // get all concoctions that match fitbit id and webhook event
      concCtrl.getConcoctions('fitbit', alias, obj['ownerId']).then((concoctionList) => {
        let concoctions = concoctionList.rows;

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

        // query fitbit endpoint for update information
        request(options, (err, res, body) => {
          if (err) {
            console.log('err', err);
          } else {
            // look at each individual concoction and fire action
            async.each((concoctions), (concoction, callback) => {
              let fitbitData = JSON.parse(body);
              fitbitReqObj.actionParams = JSON.parse(concoction.actionparams);
              fitbitReqObj.actionToken = concoction.actiontoken;

              // check if we're dealing with activities
              if (fitbitData.hasOwnProperty('activities')) {
                let activitiesData = fitbitData.activities;
                let activity = JSON.parse(concoction.triggerparams).param['fitbit_activity'].toLowerCase();

                // filter activites data based on activity user has specified
                let activityData = activitiesData.filter((event) => event.name.toLowerCase() === activity);

                // keep track of activity id? since we get all activity events everytime

                // check which action apis we're dealing with and the corresponding action
                if (concoction.actionapi === 'googleSheets' && concoction.actionevent === 'create_sheet') {
                  let sheetData = activityData.slice(-1); // change this to the activities we haven't recorded yet
                  fitbitReqObj.data = sheetData;
                  webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](fitbitReqObj);
                  callback();

                } else if (concoction.actionapi === 'slack' && concoction.actionevent === 'post_message') {
                  webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](fitbitReqObj);
                  callback();

                } else if (concoction.actionapi === 'twilio' && concoction.actionevent === 'send_text') {
                  webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](fitbitReqObj);
                  callback();

                } else if (concoction.actionapi === 'googleMail' && concoction.actionevent === 'send_email') {
                  webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](fitbitReqObj);
                  callback();

                } else {
                  callback();
                }
              }
            }, (error) => { error ? console.log(error) : console.log('All actions shot triggered by Fitbit Event'); });
          }
        });
      }).catch((error) => {
        res.status(500).send('Server Error in Fitbit trigger');
        console.log(error);
      });
    }, (error) => { error ? console.log(error) : console.log('All actions shot triggered by Fitbit Event', req.body[0].collectionType); }); //closing async
  },
}
