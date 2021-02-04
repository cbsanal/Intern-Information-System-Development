const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

// const mongoSanitize = require('express-mongo-sanitize');
// const xss = require('xss-clean');
// const hpp = require('hpp');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
// const lessonRouter = require('./routes/lessonRouter');
const companyRouter = require('./routes/companyRoutes');
const studentRouter = require('./routes/studentRoutes');
const teacherRouter = require('./routes/teacherRoutes');
// const userRouter = require('./routes/companyRoutes');
// const adminRouter = require('./routes/adminRouter');

// const reviewRouter = require('./routes/reviewRoutes');
const viewRouter = require('./routes/viewRoutes');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) Global MIDDLEWARES
app.use(express.static(path.join(__dirname, 'public')));
// Security HTTP header

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'", 'https:', 'http:', 'data:', 'ws:'],
      baseUri: ["'self'"],
      fontSrc: ["'self'", 'https:', 'http:', 'data:'],
      scriptSrc: ["'self'", 'https:', 'http:', 'blob:'],
      styleSrc: ["'self'", "'unsafe-inline'", 'https:', 'http:'],
      connectSources: ["'self'", 'ws://localhost:8000']
    }
  })
);

// app.use(cors());
// Development Login
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Limit requests from same api
// const limiter = rateLimit({
//   max: 100,
//   // aynı ıp adresinden saate 100 req yapabilir
//   windowMs: 60 * 60 * 1000,
//   message:
//     'Too mant requests from this IP, please try again in an hour!'
// });
// app.use('/api', limiter); // /api ile başlayan routeları etkiler

// Body parser
app.use(express.json({ limit: '10kb' }));
app.use(cookieParser());

// Data sanitization against NoSQL query injection
// app.use(mongoSanitize());
// Data sanitization against XSS
// app.use(xss());

// Prevent parameter polution
// app.use(
//   hpp({
//     whitelist: [
//       'duration',
//       'ratingsQuantity',
//       'ratingsAverage',
//       'maxGroupSize',
//       'difficulty',
//       'price'
//     ]
//   })
// );
// // Serving Static File
// app.use(express.static(`${__dirname}/public`));

// Test Middleware
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  console.log(req.cookies);
  next();
});

// 3) ROUTES
app.use('/', viewRouter);
app.use('/api/v1/company/', companyRouter);
app.use('/api/v1/student/', studentRouter);
app.use('/api/v1/teacher/', teacherRouter);
// app.use('/admin', adminRouter);
// app.use('/api/v1/lessons', lessonRouter);
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/reviews', reviewRouter);

app.all('*', (req, res, next) => {
  next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404)
  );
});

app.use(globalErrorHandler);

module.exports = app;
