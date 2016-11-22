const express = require('express');
const concoctionConstructor = require('../../db/controllers/concoctionController');
const router = new express.Router();

router.post('/slack/add', concoctionConstructor.createSlackTrigger);
router.post('/slack/query', concoctionConstructor.getSlackEvent);
//router.post('/changeEnabled', concoctionConstructor.changeEnabled);

module.exports = router;
