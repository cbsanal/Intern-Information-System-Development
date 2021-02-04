const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Student = require('./../models/studentModel');
const Company = require('./../models/companyModel');
const Teacher = require('./../models/teacherModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  res.cookie('jwt', token, {
    expires: new Date(
      Date.now() +
        process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 60 * 1000
    ),
    // secure: true, //https olduğunda sadece token gönder
    httpOnly: true
    // SameSite: false
  });
  // Remove password from the output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: { user }
  });
};
exports.signupCompany = catchAsync(async (req, res, next) => {
  const newCompany = await Company.create({
    companyName: req.body.companyName,
    companyEmail: req.body.email,
    companyPassword: req.body.password
    // passwordConfirm: req.body.passwordConfirm
  });
  createSendToken(newCompany, 201, res);
});
exports.signupStudent = catchAsync(async (req, res, next) => {
  const newCompany = await Student.create({
    name: req.body.name,
    studentNo: req.body.studentNo,
    studentAvg: req.body.studentAvg,
    studentClass: req.body.studentClass,
    email: req.body.email,
    password: req.body.password
    // passwordConfirm: req.body.passwordConfirm
  });
  createSendToken(newCompany, 201, res);
});
exports.signupTeacher = catchAsync(async (req, res, next) => {
  const newTeacher = await Teacher.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  createSendToken(newTeacher, 201, res);
});
exports.isLoggedInCompany = async (req, res, next) => {
  // 1) Getting the token and check if it is exists
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // 2) Verification token
      // 3) Check if user still exists
      const freshUser = await Company.findById(decoded.id);
      if (!freshUser) {
        return next();
      }
      // 4) Check if user changed password after the token issued
      // if (freshUser.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }
      // Grant access to protected routes
      req.user = freshUser;
      res.locals.user = freshUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
exports.isLoggedInStudent = async (req, res, next) => {
  // 1) Getting the token and check if it is exists
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      // 2) Verification token
      // 3) Check if user still exists
      const freshUser = await Student.findById(decoded.id);
      if (!freshUser) {
        return next();
      }
      // 4) Check if user changed password after the token issued
      // if (freshUser.changedPasswordAfter(decoded.iat)) {
      //   return next();
      // }
      // Grant access to protected routes
      req.user = freshUser;
      res.locals.user = freshUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
exports.isLoggedInTeacher = async (req, res, next) => {
  // 1) Getting the token and check if it is exists
  if (req.cookies.jwt) {
    try {
      const decoded = await promisify(jwt.verify)(
        req.cookies.jwt,
        process.env.JWT_SECRET
      );
      const freshUser = await Teacher.findById(decoded.id);
      if (!freshUser) {
        return next();
      }
      req.user = freshUser;
      res.locals.user = freshUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
exports.loginCompany = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Lütfen Email ve Şifre Giriniz!', 400));
  }

  // 2) Check if use exists && password is correct
  const company = await Company.findOne({
    companyEmail: email
  }).select('+companyPassword');

  if (
    !company ||
    !(await company.correctPassword(
      password,
      company.companyPassword
    ))
  ) {
    return next(new AppError('Yanlış Şifre veya Email', 401));
  }
  // 3) If everything ok, send token to client
  createSendToken(company, 200, res);
});
exports.loginStudent = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Lütfen Email ve Şifre Giriniz!', 400));
  }

  // 2) Check if use exists && password is correct
  const student = await Student.findOne({ email }).select('password');

  if (
    !student ||
    !(await student.correctPassword(password, student.password))
  ) {
    return next(new AppError('Yanlış Şifre veya Email', 401));
  }
  // 3) If everything ok, send token to client
  createSendToken(student, 200, res);
});
exports.loginTeacher = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Lütfen Email ve Şifre Giriniz!', 400));
  }

  // 2) Check if use exists && password is correct
  const teacher = await Teacher.findOne({ email }).select('password');

  if (
    !teacher ||
    !(await teacher.correctPassword(password, teacher.password))
  ) {
    return next(new AppError('Yanlış Şifre veya Email', 401));
  }
  // 3) If everything ok, send token to client
  createSendToken(teacher, 200, res);
});
// exports.loginAdmin = catchAsync(async (req, res, next) => {
//   const { email, password } = req.body;

//   // 1) Check if email and password exist
//   if (!email || !password) {
//     return next(new AppError('Lütfen Email ve Şifre Giriniz!', 400));
//   }
//   // 2) Check if use exists && password is correct
//   const user = await Admin.findOne({ email }).select('+password');

//   if (
//     !user ||
//     !(await user.correctPassword(password, user.password))
//   ) {
//     return next(new AppError('Yanlış Şifre veya Email', 401));
//   }
//   // 3) If everything ok, send token to client
//   createSendToken(user, 200, res);
// });
exports.logout = (req, res) => {
  res.clearCookie('jwt');
  // console.log('buradaaaa');
  // res.cookie('jwt', 'loggedout', {
  //   expires: new Date(Date.now() + 10 * 1000),
  //   httpOnly: true
  // });
  res.status(200).json({ status: 'success' });
};
// exports.protect = catchAsync(async (req, res, next) => {
//   // 1) Getting the token and check if it is exists
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   } else if (req.cookies.jwt) {
//     token = req.cookies.jwt;
//   }

//   if (!token) {
//     return next(
//       new AppError('You are not logged in! Please log in!', 401)
//     );
//   }

//   // 2) Verification token
//   const decoded = await promisify(jwt.verify)(
//     token,
//     process.env.JWT_SECRET
//   );

//   // 3) Check if user still exists
//   const freshUser = await User.findById(decoded.id);
//   if (!freshUser) {
//     return next(new AppError('The user no longer exists!', 401));
//   }

//   // 4) Check if user changed password after the token issued
//   if (freshUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError(
//         'User recently changed password! Please log in again',
//         401
//       )
//     );
//   }

//   // Grant access to protected routes
//   req.user = freshUser;
//   next();
// });
// Only for renderend pages

// exports.isLoggedInAdmin = async (req, res, next) => {
//   // 1) Getting the token and check if it is exists
//   if (req.cookies.jwt) {
//     try {
//       // 1) verify token
//       const decoded = await promisify(jwt.verify)(
//         req.cookies.jwt,
//         process.env.JWT_SECRET
//       );
//       // 2) Verification token
//       // 3) Check if user still exists
//       const freshUser = await Admin.findById(decoded.id);
//       if (!freshUser) {
//         return next();
//       }
//       // 4) Check if user changed password after the token issued
//       // if (freshUser.changedPasswordAfter(decoded.iat)) {
//       //   return next();
//       // }
//       // Grant access to protected routes
//       res.locals.user = freshUser;
//       return next();
//     } catch (err) {
//       return next();
//     }
//   }
//   next();
// };
