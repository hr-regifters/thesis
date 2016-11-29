"use strict"
const gmailKey = process.env.GMAIL_API_KEY || require('./../../../../env').GMAIL_API_KEY;
const request = require('request');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
  },
  actions: {
    send_email: (paramObj) => {
      let userEmail = 'From: ' + paramObj.actionParams.email;
      let recipient = 'To: ' + paramObj.actionParams.recipient;
      let subject = 'Subject: ' + paramObj.actionParams.subject;
      let message = paramObj.actionParams.gmail_text;
      let body = `${recipient}/r/n${userEmail}/r/n${subject}/r/n${message}`
      let base64Email = new Buffer(body).toString('base64');
      base64Email = base64Email.replace(/\+/g, '-').replace(/\//g, '_');
      let token = paramObj.actiontoken;
      console.log('token', token);
      let options = {
        uri: `https://www.googleapis.com/gmail/v1/users/${userEmail}/messages/send`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        json: {
          'raw': base64Email
        }
      }
      request(options, (err, res, body) => {
        if (err) {
          console.log('error', err);
        } else {
          console.log('Successfully sent email');
        }
      });
    },
  },
};
