const mongoose = require('mongoose');

const adApplySchema = mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.ObjectId,
      ref: 'Student',
      required: [true, 'Bir Öğrenci id lazım']
    },
    ad: {
      type: mongoose.Schema.ObjectId,
      ref: 'Ad',
      required: [true, 'İlan id lazım']
    },
    studentVerify: {
      type: Number,
      min: 0,
      max: 2,
      default: 0,
      required: [true, 'Öğrenci onayı gerekli']
    },
    companyVerify: {
      type: Number,
      min: 0,
      max: 2,
      default: 0,
      required: [true, 'Şirket onayı gerekli']
    },
    teacherVerify: {
      type: Number,
      min: 0,
      max: 2,
      default: 0,
      required: [true, 'Öğretmen onayı gerekli']
    },
    cv: {
      type: String
      // required: [true, 'CV gerekiyor']
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

adApplySchema.virtual('ads', {
  ref: 'Ad',
  foreignField: '_id',
  localField: 'ad'
});
adApplySchema.virtual('students', {
  ref: 'Student',
  foreignField: '_id',
  localField: 'student'
});
const adApply = mongoose.model('adApply', adApplySchema);
module.exports = adApply;
