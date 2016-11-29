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
      let token = 'ya29.Ci-kA__Y0FbMVLkP5enAd9EEVvGvKEN1OPN3cVeT5BRPROAHVDmN-hoEH05UUUOlcQ';
      request.post(`https://www.googleapis.com/gmail/v1/users/${email}/messages/send?key=${gmailKey}&access_token${token}`, {
        "userId": "me",
        "resource": {
          "raw": "VG86IGtiY2h1bjU3MTJAZ21haWwuY29tDQpGcm9tOiBrYmNodW41NzEyQGdtYWlsLmNvbQ0KSGVsbG8="
        }
      }, (err, res, body) => {
        console.log('error', err);
        console.log('res', res);
        console.log('body', body);
      });
    },
  },
};
