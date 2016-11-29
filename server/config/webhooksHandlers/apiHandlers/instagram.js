"use strict"
const clientId = process.env.INSTA_ID || require('./../../../../env').INSTA_ID;
const secret = process.env.INSTA_SECRET || require('./../../../../env').INSTA_SECRET;
const verifyToken = process.env.INSTA_VERIFYTOKEN || require('./../../../../env').INSTA_VERIFYTOKEN;

module.exports = {
  validate: (req, res) => {
    req.query['hub.verify_token'] === verifyToken && req.query['hub.mode'] === 'subscribe' ? res.status(200).send(req.query['hub.challenge']) : res.status(404).send('wrong verification credentials');
  },
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    console.log(req);
    console.log('called an insta trigger');
  },
  actions: {
    send_text: (paramObj) => {
      console.log('cool instagram action shot');
    },
  },
};
