"use strict"
const async = require('async');
const concCtrl = require('../../../db/controllers/concoctionController');
const slackCtrl = require('../../../db/controllers/slackController');
const userCtrl = require('../../../db/controllers/userController');
const request = require('request');
const verificationCode = '35b7e7f737cd9d2392c59413ddc5064e09f19b57d8d3998988fab2c66fb01f99';
const listenTo = {
  file_created: true,
  pin_added: true,
};

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    const currentTime = Number(new Date());
  },
  verify: (req, res) => {
    console.log(req.params, 'req.params');
    console.log(req.query, 'req.query');
    let query = req.query.verify;
    console.log(query, 'query');
    if(query == verificationCode) {
      console.log('fuuuuck ==')
      res.status(204).send('fuckyou');
    } else {
      console.log('!fuuuck');
      res.status(404).send('fuck you too');
    }
  }
}