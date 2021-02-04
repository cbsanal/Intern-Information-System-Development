const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name!'],
    maxlength: 25
  },
  studentNo: {
    type: String,
    required: [true, 'Please tell us your'],
    unique: true,
    maxlength: 12
  },
  studentAvg: {
    type: Number,
    required: [true, 'Please tell us your average']
  },
  studentClass: {
    type: Number,
    required: [true, 'Please tell us your class'],
    length: 1
  },
  email: {
    type: String,
    required: [true, 'Please tell us your email address!'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please enter password'],
    minlength: 8,
    select: false
  }
});

studentSchema.pre('save', async function(next) {
  //Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  //Delete passwordConfirm area
  this.passwordConfirm = undefined;
  next();
});

studentSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
