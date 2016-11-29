"use strict"
const gmailKey = process.env.GMAIL_API_KEY || require('./../../../../env').GMAIL_API_KEY;
const request = require('request');

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
  },
  actions: {
    send_email: (paramObj) => {
      console.log('sending email')
      let email = 'kbchun5712@gmail.com';
      let token = 'ya29.CjukA9v_WzCks8A4OjwKdNODgwH56io7CKnYu16-kxD4g4KQrK92vy2fcv0wZufJhwFY_cYvzmX_bFG2NQ';
      let options = {
        uri: `https://www.googleapis.com/gmail/v1/users/${email}/messages/send`,
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          'raw': 'VG86IGtiY2h1bjU3MTJAZ21haWwuY29tDQpGcm9tOiBrYmNodW41NzEyQGdtYWlsLmNvbQ0KSGVsbG8='
        }
      }
      request.post(options, (err, res, body) => {
        console.log('error', err);
        console.log('res', res);
        console.log('body', body);
      });
    },
  },
};
