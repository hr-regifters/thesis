"use strict"
const request = require('request');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
  },
  actions: {
    send_email: (paramObj) => {
      let userEmail = paramObj.actionParams.email;
      let sender = 'From: ' + userEmail;
      let recipient = 'To: ' + paramObj.actionParams.recipient;
      let replyTo = 'Reply-To: ' + userEmail;
      let subject = 'Subject: ' + paramObj.actionParams.subject;
      let date = 'Date: ' + (new Date).toString();
      let msgId = 'Message-ID: ' + '<CAABxtw0sfTL1PKHa4=EAB+jxHRsDF_gzO_5noEXv6KOwc2iKZA@mail.gmail.com>';
      let message = paramObj.actionParams.gmail_text;
      let body = `${recipient}\r\n${sender}\r\n${subject}\r\n${replyTo}\r\n${date}\r\n${msgId}\r\n${message}`
      let base64Email = new Buffer(body).toString('base64');
      base64Email = base64Email.replace(/\+/g, '-').replace(/\//g, '_');
      let token = paramObj.actionToken;
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
        if (body.error) {
          console.log('error', body);
        } else {
          console.log('Successfully sent email');
        }
      });
    },
  },
};
