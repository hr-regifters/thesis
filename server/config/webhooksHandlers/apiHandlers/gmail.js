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
      let token = 'ya29.CjulA_vHFud6Axyi6X1TCYYklrxNsUaNsDnzfv37ohrJig-vcwBk0zPEza5KIVURMt9U-O3VpX_aVqySfQ';
      let options = {
        uri: `https://www.googleapis.com/gmail/v1/users/${email}/messages/send`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        json: {
          'raw': 'VG86IGtiY2h1bjU3MTJAZ21haWwuY29tDQpGcm9tOiBrYmNodW41NzEyQGdtYWlsLmNvbQ0KSGVsbG8='
        }
      }
      request(options, (err, res, body) => {
        console.log('error', err);
        console.log('res', res);
        console.log('body', body);
      });
    },
  },
};
