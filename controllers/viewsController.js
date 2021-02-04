const Ad = require('../models/adModel');
const Student = require('../models/studentModel');
const AdApply = require('../models/adApplyModel');
const AdFinal = require('../models/adFinal');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.signup = catchAsync(async (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('signup', {
      title: 'Kayıt Ol'
    });
});

exports.getLoginFormStudent = (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('loginStudent', {
      title: 'Giris'
    });
};
exports.getLoginFormCompany = (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('loginCompany', {
      title: 'Giris'
    });
};
exports.getLoginFormSchool = (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('loginSchool', {
      title: 'Giris'
    });
};
exports.getSignUpFormCompany = (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('companySignup', {
      title: 'Şirket Kayıt'
    });
};
exports.getNewAdProfileCompany = (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('companyProfile', {
      title: 'Yeni İlan Oluştur'
    });
};
exports.getSignUpFormStudent = (req, res, next) => {
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('studentSignup', {
      title: 'Öğrenci Kayıt'
    });
};
exports.getAd = catchAsync(async (req, res, next) => {
  //eğer async fonksiyonu varsa next olmalı
  // 1) Get the data, for the requested tour
  const ad = await Ad.findById(req.params.id);
  if (!ad) {
    return next(new AppError('There is no tour with that name', 404));
  }
  // 2) Build template

  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('oneAd', {
      title: 'İlan',
      ad
    });
});
exports.getAppliedAd = catchAsync(async (req, res, next) => {
  let ad = AdApply.findById(req.params.id);
  ad = ad.populate({ path: 'ads' });
  const applyAd = await ad;
  if (!applyAd) {
    return next(new AppError('İlan Bulunamadı', 404));
  }
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('oneAppliedAd', {
      title: 'İlan Kesinleştirme',
      applyAd: applyAd
    });
});
exports.getMyAds = catchAsync(async (req, res, next) => {
  const finalAd = await AdFinal.find({ student: req.user.id });
  if (finalAd.length > 0) {
    //BURAYI FİXLE BAŞKA BİR ÇÖZÜM BUL
    await AdApply.deleteMany({ student: req.user.id });
  }
  let myAds = AdApply.find({ student: req.user.id });
  myAds = myAds.populate({ path: 'ads' });
  const doc = await myAds;
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('myAds', {
      title: 'Başvurularım',
      applyAds: doc
      // applyAds: applyAds,
      // notApplyAds: notApplyAds
    });
});
exports.myAdsCompany = catchAsync(async (req, res, next) => {
  const myAdsCompany = await Ad.find({ company: req.user.id });
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('myAdsCompany', {
      title: 'İlanlarım',
      ads: myAdsCompany
    });
});
exports.getAppliedStudents = catchAsync(async (req, res, next) => {
  const myAdsCompany = await Ad.find({ company: req.user.id });
  const adIDs = myAdsCompany.map(el => el.id);
  let appliedAds = AdApply.find({
    ad: { $in: adIDs },
    companyVerify: { $ne: 2 },
    studentVerify: 1
  });
  appliedAds = appliedAds
    .populate({ path: 'ads' })
    .populate({ path: 'students' });
  const doc = await appliedAds;
  console.log(doc);
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('appliedStudents', {
      title: 'Başvurular',
      appliedAds: doc
    });
});
exports.getAdCompany = catchAsync(async (req, res, next) => {
  const ad = await Ad.findById(req.params.id);
  if (!ad) {
    return next(new AppError('İlan Bulunamadı!', 404));
  }
  // 2) Build template

  res.status(200).render('oneAdCompany', {
    title: 'İlan',
    ad
  });
});
exports.getAllAds = catchAsync(async (req, res, next) => {
  const myAds = await AdApply.find({ student: req.user.id });
  const adIDs = myAds.map(el => el.ad);
  const allAds = await Ad.find({ _id: { $nin: adIDs } });
  const finalAd = await AdFinal.find({ student: req.user.id });
  let final = false;
  if (finalAd.length > 0) {
    final = true;
  }
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('allAds', {
      title: 'Bütün İlanlar',
      ads: allAds,
      final: final
    });
});
exports.certainAdsCompany = catchAsync(async (req, res, next) => {
  const ad = await Ad.find({ company: req.user.id });
  const adIDs = ad.map(el => el.id);
  let finalAd = AdFinal.find({ ad: { $in: adIDs } });
  finalAd = finalAd
    .populate({ path: 'ads' })
    .populate({ path: 'students' });
  const doc = await finalAd;
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('certainAdsCompany', {
      title: 'Kesinleşen Stajlar',
      finalAds: doc
    });
});
exports.certainAdsSchool = catchAsync(async (req, res, next) => {
  let finalAds = AdFinal.find();
  finalAds = finalAds
    .populate({ path: 'ads' })
    .populate({ path: 'students' });
  const doc = await finalAds;
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('certainAdsSchool', {
      title: 'Kesinleşen Stajlar',
      finalAds: doc
    });
});
exports.certainOneAdCompany = catchAsync(async (req, res, next) => {
  let finalAds = AdFinal.find({ _id: req.params.id });
  finalAds = finalAds
    .populate({ path: 'ads' })
    .populate({ path: 'students' });
  const doc = await finalAds;
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('certainOneAdCompany', {
      title: 'Bütün İlanlar',
      finalAds: doc
    });
});
exports.certainOneAdSchool = catchAsync(async (req, res, next) => {
  let finalAds = AdFinal.find({ _id: req.params.id });
  finalAds = finalAds
    .populate({ path: 'ads' })
    .populate({ path: 'students' });
  const doc = await finalAds;
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('certainOneAdSchool', {
      title: 'Bütün İlanlar',
      finalAds: doc
    });
});
exports.getOneAppliedStudent = catchAsync(async (req, res, next) => {
  const appliedAd = AdApply.findById(req.params.id);
  appliedAd.populate({ path: 'students' });
  const doc = await appliedAd;
  // const studentId = appliedAd.student;
  // const student = await Student.findById(studentId);
  if (!appliedAd) {
    return next(new AppError('Öğrenci Bulunamadı!', 404));
  }
  // 2) Build template
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('oneAppliedStudent', {
      title: 'Öğrenci',
      appliedAd: doc
    });
});
exports.waitingVerify = catchAsync(async (req, res, next) => {
  let appliedAds = AdApply.find({
    studentVerify: 1,
    companyVerify: 1,
    teacherVerify: 0
  });
  appliedAds = appliedAds
    .populate({ path: 'ads' })
    .populate({ path: 'students' });
  const doc = await appliedAds;
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('adsSchool', {
      title: 'Onay Bekleyenler',
      appliedAds: doc
    });
});
exports.getAdSchool = catchAsync(async (req, res, next) => {
  let ad = AdApply.findById(req.params.id);
  ad = ad.populate({ path: 'ads' }).populate({ path: 'students' });
  const doc = await ad;
  if (!ad) {
    return next(new AppError('İlan Bulunamadı!', 404));
  }
  res.status(200).render('oneAdSchool', {
    title: 'İlan',
    appliedAd: doc
  });
});
exports.getfinalAd = catchAsync(async (req, res, next) => {
  let finalAd = AdFinal.find({ student: req.user.id });
  finalAd = await finalAd.populate({ path: 'ads' });
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('finalAd', {
      title: 'Kesinleşen İlanlar',
      finalAds: finalAd
    });
});
exports.getOneFinalAd = catchAsync(async (req, res, next) => {
  let finalAd = AdFinal.findById(req.params.id);
  finalAd = await finalAd.populate({ path: 'ads' });
  res
    .status(200)
    .set(
      'Content-Security-Policy',
      "connect-src 'self' https://cdnjs.cloudflare.com"
    )
    .render('OneFinalAd', {
      title: 'Kesinleşen İlanlar',
      finalAd: finalAd
    });
});
