"use strict"
const env = require('./../../../../env');

const clientId = process.env.INSTA_ID || env.INSTA_ID;
const secret = process.env.INSTA_SECRET || env.INSTA_SECRET;
const verifyToken = process.env.verifyToken || env.INSTA_VERIFYTOKEN;

module.exports = {
  validate: (req, res) => {
    console.log('insta validate called');
    console.log(req);
  },
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    console.log('called an insta trigger');
  },
  actions: {
    send_text: (paramObj) => {
      console.log('cool instagram action shot');
    },
  },
};
