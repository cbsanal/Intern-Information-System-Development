const mongoose = require('mongoose');
// const slugify = require('slugify');

// const company = require('./companyModel');
const adSchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [
        true,
        'İlan yayınlamak için şirket isminizi girmelisiniz!'
      ]
    },
    adName: {
      type: String,
      maxlength: [50, 'İlan ismi maksimum 50 karakter olabilir.'],
      required: [true, 'Lütden bir ilan ismi giriniz.']
    },
    adSum: {
      type: String,
      minlength: [
        120,
        'İlan açıklaması en az 120 karakter olmalıdır.'
      ],
      required: [true, 'Lütfen ilan açıklaması giriniz!']
    },
    company: {
      type: mongoose.Schema.ObjectId,
      ref: 'Company',
      required: [true, 'Dersin Bir Hocası Olmalı']
    },
    yetkiliAdi: {
      type: String,
      required: [true, 'Lütfen Yetkili Adını Giriniz.']
    },
    yetkiliDipNo: {
      type: String,
      required: [true, 'Lütfen Diploma Numaranızı Giriniz.']
    },
    yetkiliUni: {
      type: String,
      required: [true, 'Lütfen Mezun Olduğunuz Üniversiteyi Giriniz.']
    },
    yetkiliBolum: {
      type: String,
      required: [true, 'Lütfen Mezun Olunan Bölümü Giriniz.']
    },
    diploma: {
      type: String,
      required: [
        true,
        'Lütfen Yetkili Kişinin Diplomasını Ekleyiniz.'
      ]
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

const Ad = mongoose.model('Ad', adSchema);
module.exports = Ad;
