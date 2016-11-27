const express = require('express');
const concoctionConstructor = require('../../db/controllers/concoctionController');
const router = new express.Router();

router.post('/add', concoctionConstructor.createConcoction);
router.post('/toggleEnable', concoctionConstructor.toggleConcoction);

module.exports = router;
