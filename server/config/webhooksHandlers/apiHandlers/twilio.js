"use strict"
const accountSid = process.env.TWILIO_ACCOUNT_SID || require('./../../../../env').TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN || require('./../../../../env').TWILIO_AUTH_TOKEN;
const sendingNumber = process.env.TWILIO_NUMBER || require('./../../../../env').TWILIO_NUMBER;
const twilio = require('twilio')(accountSid, authToken);

module.exports = {
  trigger: (req, res) => {
    const webhooksHandler = require('./../main');
    console.log('there is no twilio trigger, so why do you call it?');
  },
  actions: {
    send_sms: (paramObj) => {
      let smsObj = {
        to: paramObj.phoneNumber,
        from: sendingNumber,
        body: paramObj.message,
      };
      //paramObj.mediaUrl !== undefined ? smsObj.mediaUrl = paramObj.mediaUrl : null; // enable if media should be supported
      twilio.messages.create(smsObj)
      .then((message) => { console.log(`SMS successfully sent to ${paramObj.recipient}`, message); })
      .catch((error) => { console.log(`error occurred while sending a SMS via Twilio: ${JSON.stringify(error)}`); });
    },
  },
};
