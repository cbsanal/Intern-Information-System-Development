const express = require('express');
const AdController = require('./../controllers/adController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('ad/:id').get(AdController.getOneAd);
// router.route('ad/:id').post(AdController.applyAd);

module.exports = router;
