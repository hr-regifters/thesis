const slackHandler = require('./apiHandlers/slack');
const evernoteHandler = require('./apiHandlers/evernote');
const githubHandler = require('./apiHandlers/github');
const twilioHandler = require('./apiHandlers/twilio');
const fitbitHandler = require('./apiHandlers/fitbit');
const gmailHandler = require('./apiHandlers/gmail');
const googleSheetsHandler = require('./apiHandlers/googleSheets');
// import handler for each api here

module.exports = {
  slackTrigger: slackHandler.trigger,
  slackAction: slackHandler.actions,
  evernoteTrigger: evernoteHandler.trigger,
  evernoteAction: evernoteHandler.actions,
  githubTrigger: githubHandler.trigger,
  githubAction: githubHandler.actions,
  twilioAction: twilioHandler.actions,
  fitbitVerify: fitbitHandler.verify,
  fitbitTrigger: fitbitHandler.trigger
  googleMailAction: gmailHandler.actions,
  googleSheetsAction: googleSheetsHandler.actions,
};
