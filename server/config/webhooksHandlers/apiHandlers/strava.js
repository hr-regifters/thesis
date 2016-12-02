"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const request = require('request');

module.exports = {
  validate: (req, res) => {
    let query = {'hub.challenge' : req.query['hub.challenge']};
    res.status(200).send(query);
  },

  trigger: (req, res) => {
    res.status(200).send();
    const webhooksHandler = require('./../main');
    let stravaReqObj = {
      actionParams: '',
      actionToken: ''
    };
    concCtrl.getConcoctions('strava', 'activity_logged', req.body['ownerId']).then((concoctionList) => {
      let concoctions = concoctionList.rows.filter((concoction) => concoction.enable === true);
      let options = {
        url: `https://www.strava.com/api/v3/activities/${req.body['object_id']}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${concoctions[0].triggertoken}`
        }
      };

      // query strava endpoint for update information
      request(options, (err, res, body) => {
        if (err) {
          console.log('err', err);
        } else {
          concoctions = concoctions.filter((concoction) => {
            let activity = JSON.parse(concoction.triggerparams).param['strava_activity'].toLowerCase();
            return JSON.parse(body).type.toLowerCase() === activity;
          });

          // look at each individual concoction
          async.each((concoctions), (concoction, callback) => {
            let stravaData = JSON.parse(body);
            stravaReqObj.actionParams = JSON.parse(concoction.actionparams);
            stravaReqObj.actionToken = concoction.actiontoken;

            // check which action apis we're dealing with and the corresponding action
            if (concoction.actionapi === 'googleSheets' && concoction.actionevent === 'create_sheet') {
              let sheetData = {
                name: stravaData.name,
                type: stravaData.type,
                distance: stravaData.distance,
                moving_time: stravaData.moving_time,
                elapsed_time: stravaData.elapsed_time,
                start_date_local: stravaData.start_date_local,
                total_elevation_gain: stravaData.total_elevation_gain,
                achievement_count: stravaData.achievement_count,
                average_speed: stravaData.average_speed,
                max_speed: stravaData.max_speed,
                calories: stravaData.calories
              };
              stravaReqObj.data = [sheetData];
              webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](stravaReqObj);
              callback();
            } else if (concoction.actionapi === 'slack' && concoction.actionevent === 'post_message') {
              webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](stravaReqObj);
              callback();
            } else if (concoction.actionapi === 'twilio' && concoction.actionevent === 'send_text') {
              webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](stravaReqObj);
              callback();
            } else if (concoction.actionapi === 'googleMail' && concoction.actionevent === 'send_email') {
              webhooksHandler[`${concoction.actionapi}Action`][concoction.actionevent](stravaReqObj);
              callback();
            } else {
              console.log('Following Concoction not fired: ', concoction.description);
              callback();
            }
          }, (error) => { error ? console.log(error) : console.log('All actions shot triggered by Strava Event:'); });
        }
      });
    });
  }
}
