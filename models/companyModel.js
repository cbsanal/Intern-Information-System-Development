const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const companySchema = mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Lütfen Şirket İsmini Giriniz!']
  },
  companyEmail: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, 'Lütfen bir mail adresi giriniz!'],
    validate: [validator.isEmail, 'Lütfen geçerli bir email giriniz!']
  },
  companyPassword: {
    type: String,
    required: [true, 'Lütfen bir şifre giriniz'],
    minlength: 8,
    select: false
  }
  // companyPasswordConfirm: {
  //   type: String,
  //   required: [true, 'Lütfen bir şifre doğrulamayı giriniz!'],
  //   validate: {
  //     validator: function(el) {
  //       return el === this.companyPassword;
  //     },
  //     message: 'Şifreler aynı değil'
  //   }
  // }
});
companySchema.pre('save', async function(next) {
  //Only run this function if password was actually modified
  if (!this.isModified('companyPassword')) return next();
  this.companyPassword = await bcrypt.hash(this.companyPassword, 12);

  //Delete passwordConfirm area
  this.companyPasswordConfirm = undefined;
  next();
});

companySchema.methods.correctPassword = async function(
  candidatePassword,
  companyPassword
) {
  return await bcrypt.compare(candidatePassword, companyPassword);
};

const Company = mongoose.model('Company', companySchema);

module.exports = Company;
