const evernoteHandler = require('./apiHandlers/evernote');
const fitbitHandler = require('./apiHandlers/fitbit');
const gmailHandler = require('./apiHandlers/gmail');
const googleSheetsHandler = require('./apiHandlers/googleSheets');
const instagramHandler = require('./apiHandlers/instagram');
const slackHandler = require('./apiHandlers/slack');
const stravaHandler = require('./apiHandlers/strava');
const twilioHandler = require('./apiHandlers/twilio');
// import handler for each api here

module.exports = {
  fitbitTrigger: fitbitHandler.trigger,
  instagramTrigger: instagramHandler.trigger,
  slackTrigger: slackHandler.trigger,
  stravaTrigger: stravaHandler.trigger,

  evernoteAction: evernoteHandler.actions,
  googleMailAction: gmailHandler.actions,
  googleSheetsAction: googleSheetsHandler.actions,
  slackAction: slackHandler.actions,
  twilioAction: twilioHandler.actions,

  fitbitValidator: fitbitHandler.validate,
  instagramValidator: instagramHandler.validate,
  stravaValidator: stravaHandler.validate,
};
