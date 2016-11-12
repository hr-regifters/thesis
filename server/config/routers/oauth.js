const express = require('express');
const SlackStrategy = require('../../db/controllers/slackController');
const router = new express.Router();

router.get('/slack', SlackStrategy.authenticate('slack'));

router.get('/slack/callback', SlackStrategy.authenticate('slack', { failureRedirect: '/' })
);

module.exports = router;