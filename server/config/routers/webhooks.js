const express = require('express');
const webhookHandler = require('./../webhooksHandlers/main');

const router = new express.Router();

router.post('/slack', webhookHandler.slackTrigger);
router.post('/fitbit', webhookHandler.fitbitTrigger);
router.get('/fitbit', webhookHandler.fitbitVerify);
router.get('/strava', webhookHandler.stravaVerify);
router.post('/strava', webhookHandler.stravaTrigger);

module.exports = router;
