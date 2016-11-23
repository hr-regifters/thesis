const express = require('express');
const concoctionConstructor = require('../../db/controllers/concoctionController');
const router = new express.Router();


router.post('/slack/add', concoctionConstructor.createConcoction);
// router.post('/slack/query',concoctionConstructor.getSlackEvent);
router.get('/test', concoctionConstructor.queryConcoctions)
router.post('/changeEnabled', concoctionConstructor.toggleConcoction);


module.exports = router;
