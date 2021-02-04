const mongoose = require('mongoose');

const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});
dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('Veritabanı bağlantısı başarılı!'));

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`Uygulama port ${port}'da çalışıyor.`);
});

//Veritabanı bağlantı sorunu, port sorunu gibi sorunları handle etme
process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💣 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
