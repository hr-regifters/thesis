const express = require('express');
const webhookHandler = require('./../webhooksHandlers/main');

const router = new express.Router();

router.post('/fitbit', webhookHandler.fitbitTrigger);
router.post('/instagram', webhookHandler.instagramTrigger);
router.post('/slack', webhookHandler.slackTrigger);
router.post('/strava', webhookHandler.stravaTrigger);

router.get('/fitbit', webhookHandler.fitbitValidator);
router.get('/instagram', webhookHandler.instagramValidator);
router.get('/strava', webhookHandler.stravaValidator);

module.exports = router;
