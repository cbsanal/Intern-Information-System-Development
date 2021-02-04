const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');
// const lessonController = require('../controllers/lessonController');

const router = express.Router();
// Student
router.get('/studentSignup', viewsController.getSignUpFormStudent);
router.get(
  '/allAds',
  authController.isLoggedInStudent,
  viewsController.getAllAds
);
router.get(
  '/myAds',
  authController.isLoggedInStudent,
  viewsController.getMyAds
);
router.get(
  '/myAds/:id',
  authController.isLoggedInStudent,
  viewsController.getAppliedAd
);
router.get('/', viewsController.getLoginFormStudent);
router.get(
  '/ad/:id',
  authController.isLoggedInStudent,
  viewsController.getAd
);

// Company
router.get('/loginCompany', viewsController.getLoginFormCompany);
router.get('/companySignup', viewsController.getSignUpFormCompany);
router.get(
  '/companyProfile',
  authController.isLoggedInCompany,
  viewsController.getNewAdProfileCompany
);
router.get(
  '/myAdsCompany',
  authController.isLoggedInCompany,
  viewsController.myAdsCompany
);
router.get(
  '/myAdsCompany/:id',
  authController.isLoggedInCompany,
  viewsController.getAdCompany
);
router.get(
  '/appliedStudents',
  authController.isLoggedInCompany,
  viewsController.getAppliedStudents
);
router.get(
  '/appliedStudents/:id',
  authController.isLoggedInCompany,
  viewsController.getOneAppliedStudent
);

// Teacher
router.get('/loginSchool', viewsController.getLoginFormSchool);
router.get(
  '/waitingVerify',
  authController.isLoggedInTeacher,
  viewsController.waitingVerify
);
router.get(
  '/waitingVerify/:id',
  authController.isLoggedInTeacher,
  viewsController.getAdSchool
);
router.get(
  '/finalAd',
  authController.isLoggedInStudent,
  viewsController.getfinalAd
);
router.get(
  '/finalAd/:id',
  authController.isLoggedInStudent,
  viewsController.getOneFinalAd
);
router.get(
  '/certainAdsCompany',
  authController.isLoggedInCompany,
  viewsController.certainAdsCompany
);
router.get(
  '/certainAdsCompany/:id',
  authController.isLoggedInCompany,
  viewsController.certainOneAdCompany
);
router.get(
  '/certainAdsSchool',
  authController.isLoggedInTeacher,
  viewsController.certainAdsSchool
);
router.get(
  '/certainAdsSchool/:id',
  authController.isLoggedInTeacher,
  viewsController.certainOneAdSchool
);
// Ads

module.exports = router;
