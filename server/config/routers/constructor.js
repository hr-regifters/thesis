const express = require('express');
const concoctionConstructor = require('../../db/controllers/concoctionController');
const router = new express.Router();

router.post('/slack/add', concoctionConstructor.createSlackTrigger);



module.exports = router;