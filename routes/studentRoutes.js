const express = require('express');
const adController = require('./../controllers/adController');
const authController = require('./../controllers/authController');

const router = express.Router();
router.use(authController.isLoggedInStudent);

router.post('/signup', authController.signupStudent);
router.post('/login', authController.loginStudent);
router.get('/logout', authController.logout);

router.post(
  '/ad/:id',
  adController.uploadStudentCV,
  adController.applyAd
);
router.patch('/myAds/:id', adController.certainStudentAd);
router.post(
  '/finalAd/:id',
  adController.uploadStajDosya,
  adController.uploadStajFileAd
);
router.get('/certainAdsSchool/:id', adController.getStajRapor);

module.exports = router;
