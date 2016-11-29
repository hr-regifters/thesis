const express = require('express');
const webhookHandler = require('./../webhooksHandlers/main');

const router = new express.Router();

router.post('/slack', webhookHandler.slackTrigger);

module.exports = router;
