"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const request = require('request');

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
    console.log('webhook received!');
    let fitbitReqObj = {
      actionParams: '',
      actionToken: ''
    };
    let obj = req.body;
    console.log(obj, 'req.body')
    res.status(200).send();
    concCtrl.getConcoctions('strava', 'activity_logged', obj['ownerId']).then((concoctionlist) => {
      console.log(concoctionlist.rows, 'concoctionlist.rows');
      let concoctions = concoctionlist.rows.filter((concoction) => concoction.enable === true);
      let options = {
        url: `https://www.strava.com/api/v3/activities/${obj['object_id']}`,
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${'613a8c84b8b09b8c3c40dad260fc9332dc6da23e'}`
        }
      };
      // query endpoint for update information
      request(options, (err, res, body) => {
        console.log(body, 'body');
        let data = body;
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
        [id, resource_state, external_id, upload_id, athlete, embed_token]
        //complete action
        concoctions.forEach((concoction) => {
          let fitbitData = JSON.parse(res.body);
          fitbitReqObj.actionParams = JSON.parse(concoction.actionparams);
          fitbitReqObj.actionToken = concoction.actiontoken;

          // check if we're dealing with activities
          if (fitbitData.hasOwnProperty('activities')) {
            let activitiesData = fitbitData.activities;
            let activity = JSON.parse(concoction.triggerparams).param['activity'].toLowerCase();

            // filter activites data based on activity user has specified
            let activityData = activitiesData.filter((event) => event.name.toLowerCase() === activity);
            // console.log('filtered activity data', activityData);
          }
        });
      });
    });
  }
}