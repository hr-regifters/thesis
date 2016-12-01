"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const slackCtrl = require('../../../db/controllers/slackController');
const userCtrl = require('../../../db/controllers/userController');
const request = require('request');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    console.log('GITHUB TRIGGER SHOT');
    // var requestObj = {
    //   uri: `https://api.github.com/repos/hr-regifters/thesis/hooks`,
    //   method: 'POST',
    //   headers: {
    //     // Authorization: 'Basic XXXHASHXXX',
    //     Authorization: `token XXXXXX`,
    //     'User-Agent': process.env.GITHUB_ID || require('./../../../../env').GITHUB_ID,
    //     'Content-Type': 'application/json',
    //   },
    //   json: {
    //     "name": "web",
    //     "active": true,
    //     "events": [
    //       "push",
    //       "pull_request",
    //     ],
    //     "config": {
    //       "url": "https://regifters48.herokuapp.com/api/webhooks/github",
    //       "content_type": "json"
    //     }
    //   }
    // };
    // request(requestObj, (err, res, body) => {
    //   console.log('response is: ')
    //   //console.log(res);
    //   console.log(body);
    // })
  },
  actions: {
    
  },
};

// module.exports.trigger();
