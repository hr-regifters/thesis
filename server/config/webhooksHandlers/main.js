const slackHandler = require('./apiHandlers/slack');
const evernoteHandler = require('./apiHandlers/evernote');
const githubHandler = require('./apiHandlers/github');
// import handler for each api here

module.exports = {
  slackTrigger: slackHandler.trigger,
  slackAction: slackHandler.actions,
  evernoteTrigger: evernoteHandler.trigger,
  evernoteAction: evernoteHandler.actions,
  githubTrigger: githubHandler.trigger,
  githubAction: githubHandler.actions,
};
