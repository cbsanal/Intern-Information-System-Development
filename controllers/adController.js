const multer = require('multer');
const Ad = require('../models/adModel');
const AdApply = require('../models/adApplyModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const AdFinal = require('../models/adFinal');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/pdf');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `user-${req.user.id}-${Date.now()}.${ext}`);
  }
});
const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('application/pdf')) {
    cb(null, true);
  } else {
    cb(new AppError('Lütfen pdf dosyası yükleyiniz', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

exports.uploadStudentCV = upload.single('cv');
exports.uploadDiploma = upload.single('diploma');
exports.uploadStajDosya = upload.single('stajDosya');
exports.uploadStajBasariFileAd = upload.single('stajBasari');

exports.createAd = catchAsync(async (req, res, next) => {
  const newAd = await Ad.create({
    companyName: req.body.companyName,
    adName: req.body.adName,
    adSum: req.body.adSum,
    company: req.user.id,
    yetkiliAdi: req.body.yetkiliAdi,
    yetkiliDipNo: req.body.yetkiliDipNo,
    yetkiliUni: req.body.yetkiliUni,
    yetkiliBolum: req.body.yetkiliBolum,
    diploma: req.file.filename
  });
  res.status(201).json({
    status: 'success',
    data: {
      ad: newAd
    }
  });
});
exports.getAllAds = catchAsync(async (req, res, next) => {
  const allAds = await Ad.find();
  res.status(200).json({
    status: 'success',
    data: {
      ads: allAds
    }
  });
});
exports.getMyAds = catchAsync(async (req, res, next) => {
  const allAds = await Ad.findById(res.status.user.id);
  res.status(200).json({
    status: 'success',
    data: {
      ads: allAds
    }
  });
});
exports.getOneAd = catchAsync(async (req, res, next) => {
  const ad = await Ad.findById({ _id: req.params.id });
  if (!ad) {
    return next(new AppError('No tour found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: ad
    }
  });
});

exports.applyAd = catchAsync(async (req, res, next) => {
  const adApply = await AdApply.create({
    student: req.user.id,
    ad: req.params.id,
    cv: req.file.filename
  });
  res.status(201).json({
    status: 'success',
    data: adApply
  });
});
exports.uploadStajFileAd = catchAsync(async (req, res, next) => {
  const adApply = await AdFinal.updateOne(
    { _id: req.params.id },
    { stajRapor: req.file.filename }
  );
  res.status(201).json({
    status: 'success',
    data: adApply
  });
});
exports.uploadStajBasari = catchAsync(async (req, res, next) => {
  const adApply = await AdFinal.updateOne(
    { _id: req.params.id },
    { stajBasvuru: req.file.filename }
  );
  res.status(201).json({
    status: 'success',
    data: adApply
  });
});

exports.certainStudentAd = catchAsync(async (req, res, next) => {
  const { adId } = req.body;
  const appliedAd = await AdApply.updateOne(
    {
      _id: adId
    },
    { studentVerify: 1 }
  );

  if (!appliedAd) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: appliedAd
    }
  });
});
exports.certainCompanyAd = catchAsync(async (req, res, next) => {
  const { adId } = req.body;
  const { companyVerify } = req.body;
  const appliedAd = await AdApply.updateOne(
    {
      _id: adId
    },
    { companyVerify: companyVerify }
  );

  if (!appliedAd) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      data: appliedAd
    }
  });
});
exports.certainSchoolAd = catchAsync(async (req, res, next) => {
  const { adId } = req.body;
  const { schoolVerify } = req.body;
  const appliedAd = await AdApply.findById(adId);
  if (!appliedAd) {
    return next(new AppError('İlan Bulunamadı', 404));
  }
  let finalAd;
  if (schoolVerify === 1) {
    await AdApply.updateOne(
      { _id: appliedAd.id },
      { teacherVerify: 1 }
    );
    finalAd = await AdFinal.create({
      student: appliedAd.student,
      ad: appliedAd.ad
    });
  } else {
    await Ad.findOneAndRemove({ _id: appliedAd.ad });
    await AdApply.deleteMany({ ad: appliedAd.ad });
    await AdFinal.deleteMany({ ad: appliedAd.ad });
    // await AdApply.findByIdAndRemove(adId);
  }
  res.status(200).json({
    status: 'success',
    data: {
      data: finalAd
    }
  });
});
exports.getAppliedStudents = catchAsync(async (req, res, next) => {
  const myAdsCompany = await Ad.find({ company: req.user.id });
  const adIDs = myAdsCompany.map(el => el.id);
  // const appliedAds = await AdApply.find( });
  let appliedAds = AdApply.find({
    ad: { $in: adIDs },
    companyVerify: 1
  });
  appliedAds = appliedAds
    .populate({ path: 'ads' })
    .populate({ path: 'students' });
  const doc = await appliedAds;
  // const appliedAdsAdIds = appliedAds.map(el => el.ad);
  // const studentsIDs = appliedAds.map(el => el.student);
  // const appliedStudents = await Student.find({
  //   _id: { $in: studentsIDs }
  // });
  res.status(200).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});
exports.getStudentCv = catchAsync(async (req, res, next) => {
  const appliedAd = await AdApply.findById(req.params.id);
  const path = `${__dirname}/../public/pdf/cvs/${appliedAd.cv}`;
  res.download(path);
});

exports.getYetkiliDip = catchAsync(async (req, res, next) => {
  const ad = await Ad.findById(req.params.id);
  const path = `${__dirname}/../public/pdf/cvs/${ad.diploma}`;
  res.download(path);
});
exports.getCompanyBasari = catchAsync(async (req, res, next) => {
  const ad = await AdFinal.findById(req.params.id);
  if (ad.stajBasvuru) {
    const path = `${__dirname}/../public/pdf/cvs/${ad.stajBasvuru}`;
    res.download(path);
  } else {
    return next(new AppError('Dosya Henüz Yüklenmemiş', 404));
  }
});
exports.getStajRapor = catchAsync(async (req, res, next) => {
  const ad = await AdFinal.findById(req.params.id);
  if (ad.stajRapor) {
    const path = `${__dirname}/../public/pdf/cvs/${ad.stajRapor}`;
    res.download(path);
  } else {
    return next(new AppError('Dosya Henüz Yüklenmemiş', 404));
  }
});
