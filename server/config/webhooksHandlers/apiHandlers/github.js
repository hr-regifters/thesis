"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const slackCtrl = require('../../../db/controllers/slackController');
const userCtrl = require('../../../db/controllers/userController');
const request = require('request');
const env = require ('./../../../../env');
const listenTo = {
  file_created: true,
  pin_added: true,
};


module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    var requestObj = {
      uri: `https://api.github.com/repos/hr-regifters/thesis/hooks`,
      method: 'POST',
      headers: {
        // Authorization: 'Basic Qkhlc3NlbGRpZWNrOmJhc2hlbjEzMzc=',
        Authorization: 'token dd9bddf53f9e8629e0644622a555e993db5a8ade',
        'User-Agent': env.GITHUB_ID,
        'Content-Type': 'application/json',
      },
      json: {
        "name": "web",
        "active": true,
        "events": [
          "push",
          "pull_request",
        ],
        "config": {
          "url": "https://regifters48.herokuapp.com/api/webhooks/github",
          "content_type": "json"
        }
      }
    };
    request(requestObj, (err, res, body) => {
      console.log('response is: ')
      //console.log(res);
      console.log(body);
    })
  },
  actions: {
    
  },
};

// module.exports.trigger();
