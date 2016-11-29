const express = require('express');
const webhookHandler = require('./../webhooksHandlers/main');

const router = new express.Router();

router.post('/slack', webhookHandler.slackTrigger);
router.post('/evernote', webhookHandler.evernoteTrigger);
router.post('/github', webhookHandler.githubTrigger);
router.post('/instagram', webhookHandler.instagramTrigger);
router.get('/instagram', webhookHandler.instagramValidator);

module.exports = router;
