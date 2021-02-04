const express = require('express');
const adController = require('./../controllers/adController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signupCompany);
router.post('/login', authController.loginCompany);
router.get('/logout', authController.logout);
router.post(
  '/createAd',
  authController.isLoggedInCompany,
  adController.uploadDiploma,
  adController.createAd
);
router.get('/appliedStudents/:id', adController.getStudentCv);
router.patch(
  '/appliedStudents/:id',
  authController.isLoggedInCompany,
  adController.certainCompanyAd
);
router.patch(
  '/certainAdsCompany/:id',
  authController.isLoggedInCompany,
  adController.uploadStajBasariFileAd,
  adController.uploadStajBasari
);
// router.get(
//   '/appliedStudents',
//   authController.isLoggedInCompany,
//   AdController.getAppliedStudents
// );

// router.post('/login', authController.loginCompany);
// router.use('/:userId/lessons', lessonRouter);
// router.post('/admin', authController.loginAdmin);

module.exports = router;
