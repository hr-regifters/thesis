"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const request = require('request');

module.exports = {
  verify: (req, res) => {
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
      console.log(concoctionList.rows, 'concoctionList.rows');
      let concoctions = concoctionList.rows.filter((concoction) => concoction.enable === true);
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
        if (err) {
          console.log('err', err);
        } else {
          console.log(body, 'body');
          let data = JSON.parse(body);
          let trimData = {
            name: data.name,
            type: data.type,
            distance: data.distance,
            moving_time: data.moving_time,
            elapsed_time: data.elapsed_time,
            start_date_local: data.start_date_local,
            total_elevation_gain: data.total_elevation_gain,
            achievement_count: data.achievement_count,
            average_speed: data.average_speed,
            max_speed: data.max_speed,
            calories: data.calories
          };

          //things to remove if you do it this way.
          // [id, resource_state, external_id, upload_id, athlete, embed_token]

          //complete action
          concoctions.forEach((concoction) => {
            let stravaData = JSON.parse(res.body);
            stravaReqObj.actionParams = JSON.parse(concoction.actionparams);
            stravaReqObj.actionToken = concoction.actiontoken;

            // check if we're dealing with activities
            if (stravaData.hasOwnProperty('activities')) {
              let activitiesData = stravaData.activities;
              let activity = JSON.parse(concoction.triggerparams).param['activity'].toLowerCase();

              // filter activites data based on activity user has specified
              let activityData = activitiesData.filter((event) => event.name.toLowerCase() === activity);
              // console.log('filtered activity data', activityData);
            }
          });
        }
      });
    });
  }
}