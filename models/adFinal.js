const mongoose = require('mongoose');
// const slugify = require('slugify');

// const company = require('./companyModel');
const adFinalSchema = mongoose.Schema(
  {
    ad: {
      type: mongoose.Schema.ObjectId,
      ref: 'Ad',
      required: [true, 'Bir ilana bağlı olmalı']
    },
    student: {
      type: mongoose.Schema.ObjectId,
      ref: 'Student',
      required: [true, 'Öğrenci olmalı']
    },
    stajRapor: {
      type: String
    },
    stajBasvuru: {
      type: String
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

adFinalSchema.virtual('ads', {
  ref: 'Ad',
  foreignField: '_id',
  localField: 'ad'
});
adFinalSchema.virtual('students', {
  ref: 'Student',
  foreignField: '_id',
  localField: 'student'
});

const AdFinal = mongoose.model('AdFinal', adFinalSchema);
module.exports = AdFinal;
