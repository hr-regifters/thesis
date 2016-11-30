const express = require('express');
const webhookHandler = require('./../webhooksHandlers/main');

const router = new express.Router();

router.post('/slack', webhookHandler.slackTrigger);
router.post('/evernote', webhookHandler.evernoteTrigger);
router.post('/github', webhookHandler.githubTrigger);
router.post('/fitbit', webhookHandler.fitbitTrigger);
router.get('/fitbit', webhookHandler.fitbitVerify);
router.get('/strava', webhookHandler.stravaVerify);



module.exports = router;
