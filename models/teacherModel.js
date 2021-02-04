const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const teacherSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Lütfen Şirket İsmini Giriniz!']
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Lütfen bir mail adresi giriniz!'],
    validate: [validator.isEmail, 'Lütfen geçerli bir email giriniz!']
  },
  password: {
    type: String,
    required: [true, 'Lütfen bir şifre giriniz'],
    minlength: 8,
    select: false
  }
});
teacherSchema.pre('save', async function(next) {
  //Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  //Delete passwordConfirm area
  // this.companyPasswordConfirm = undefined;
  next();
});

teacherSchema.methods.correctPassword = async function(
  candidatePassword,
  teacherPassword
) {
  return await bcrypt.compare(candidatePassword, teacherPassword);
};

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports = Teacher;
