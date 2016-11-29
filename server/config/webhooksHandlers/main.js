const slackHandler = require('./apiHandlers/slack');
const evernoteHandler = require('./apiHandlers/evernote');
const githubHandler = require('./apiHandlers/github');
const twilioHandler = require('./apiHandlers/twilio');
const instagramHandler = require('./apiHandlers/instagram');
const gmailHandler = require('./apiHandlers/gmail');
// import handler for each api here

module.exports = {
  slackTrigger: slackHandler.trigger,
  slackAction: slackHandler.actions,
  evernoteTrigger: evernoteHandler.trigger,
  evernoteAction: evernoteHandler.actions,
  githubTrigger: githubHandler.trigger,
  githubAction: githubHandler.actions,
  twilioAction: twilioHandler.actions,
  instagramValidator: instagramHandler.validate,
  instagramTrigger: instagramHandler.trigger,
  instagramAction: instagramHandler.actions,
  googleMailAction: gmailHandler.actions,
};
