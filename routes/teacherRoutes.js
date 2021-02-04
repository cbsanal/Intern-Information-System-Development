const express = require('express');
const adController = require('./../controllers/adController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signupTeacher);
router.post('/login', authController.loginTeacher);
router.get('/waitingVerify/:id', adController.getYetkiliDip);
router.post('/waitingVerify/:id', adController.certainSchoolAd);
router.get('/certainAdsSchool/:id', adController.getCompanyBasari);

module.exports = router;
