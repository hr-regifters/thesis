const slackHandler = require('./apiHandlers/slack');
const evernoteHandler = require('./apiHandlers/evernote');
const githubHandler = require('./apiHandlers/github');
const twilioHandler = require('./apiHandlers/twilio');
const gmailHandler = require('./apiHandlers/gmail');
const googleSheetsHandler = require('./apiHandlers/googleSheets');
const fitbitHandler = require('./apiHandlers/fitbit');
const stravaHandler = require('./apiHandlers/strava');
// import handler for each api here

module.exports = {
  slackTrigger: slackHandler.trigger,
  slackAction: slackHandler.actions,
  evernoteTrigger: evernoteHandler.trigger,
  evernoteAction: evernoteHandler.actions,
  githubTrigger: githubHandler.trigger,
  githubAction: githubHandler.actions,
  twilioAction: twilioHandler.actions,
  googleMailAction: gmailHandler.actions,
  googleSheetsAction: googleSheetsHandler.actions,
  fitbitVerify: fitbitHandler.verify,
  fitbitTrigger: fitbitHandler.trigger,
  stravaVerify: stravaHandler.verify,
  stravaTrigger: stravaHandler.trigger
};
