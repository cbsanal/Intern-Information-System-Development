/* eslint-disable */
import {
  loginCompany,
  loginStudent,
  logout,
  signupCompany,
  signupStudent,
  addAd,
  applyAd,
  certainAd,
  certainStudent,
  loginTeacher,
  certainSchool,
  uploadStajDosyası,
  uploadStajBasariFunc
} from './auth.js';
import '@babel/polyfill';

const formSubmitSignupCompany = document.querySelector(
  '.signup-form-company'
);
const formSubmitSignupStudent = document.querySelector(
  '.signup-form-student'
);

const logoutBtn = document.querySelector('.logout');
const newAdForm = document.querySelector('.ilanOlustur');
const formSubmitLoginCompany = document.querySelector(
  '.login-form-company'
);
const formSumbitLoginStudent = document.querySelector(
  '.login-form-student'
);
const formSubmitLoginTeacher = document.querySelector(
  '.login-form-teacher'
);
const applyAdForm = document.querySelector('.applyAdForm');
const certainAdBtn = document.querySelector('.certainAdBtn');
const cv = document.getElementById('cv');
const diploma = document.getElementById('diploma');
const certainStudentBtn = document.querySelector(
  '.certainStudentBtn'
);
const denyStudentBtn = document.querySelector('.denyStudentBtn');
const certainSchoolBtn = document.querySelector('.certainSchool');
const denySchoolBtn = document.querySelector('.denySchoolBtn');
const stajDosyası = document.getElementById('stajDosya');
const uploadStajDosya = document.querySelector('.uploadStajDosya');
const stajBasari = document.getElementById('stajBasari');
const uploadStajBasari = document.querySelector('.uploadStajBasari');
// Student

if (formSumbitLoginStudent) {
  formSumbitLoginStudent.addEventListener('submit', e => {
    const studentEmail = document.getElementById('studentEmail')
      .value;
    const studentPassword = document.getElementById('studentPassword')
      .value;
    e.preventDefault();
    loginStudent(studentEmail, studentPassword);
  });
}
if (formSubmitSignupStudent) {
  formSubmitSignupStudent.addEventListener('submit', e => {
    const studentName = document.getElementById('studentName').value;
    const studentNo = document.getElementById('studentNo').value;
    const studentAvg = document.getElementById('studentAvg').value;
    const studentClass = document.getElementById('studentClass')
      .value;
    const studentEposta = document.getElementById('studentEposta')
      .value;
    const studentPass = document.getElementById('studentPass').value;
    e.preventDefault();
    signupStudent(
      studentName,
      studentNo,
      studentAvg,
      studentClass,
      studentEposta,
      studentPass
    );
  });
}

// Company

if (formSubmitLoginCompany) {
  formSubmitLoginCompany.addEventListener('submit', e => {
    const companyEmail = document.getElementById('companyEmail')
      .value;
    const companyPassword = document.getElementById('companyPassword')
      .value;
    e.preventDefault();
    loginCompany(companyEmail, companyPassword);
  });
}

if (formSubmitSignupCompany) {
  formSubmitSignupCompany.addEventListener('submit', e => {
    const companyName = document.getElementById('kurumAdı').value;
    const companyPassword = document.getElementById('kurumSifre')
      .value;
    const compannyEmail = document.getElementById('kurumEposta')
      .value;
    e.preventDefault();
    signupCompany(companyName, compannyEmail, companyPassword);
  });
}
if (newAdForm) {
  newAdForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData();
    const yetkiliAdi = document.getElementById('yetkiliAdi').value;
    const yetkiliDipNo = document.getElementById('yetkiliDipNo')
      .value;
    const yetkiliUni = document.getElementById('yetkiliUni').value;
    const yetkiliBolum = document.getElementById('yetkiliBolum')
      .value;
    const companyName = document.getElementById('companyName').value;
    const adName = document.getElementById('adName').value;
    const adSum = document.getElementById('adSum').value;
    const diploma = document.getElementById('diploma').files[0];
    formData.append('yetkiliAdi', yetkiliAdi);
    formData.append('yetkiliDipNo', yetkiliDipNo);
    formData.append('yetkiliUni', yetkiliUni);
    formData.append('yetkiliBolum', yetkiliBolum);
    formData.append('companyName', companyName);
    formData.append('adName', adName);
    formData.append('adSum', adSum);
    formData.append('diploma', diploma);
    addAd(
      formData
      // yetkiliName,
      // dipNo,
      // yetkiliUni,
      // yetkiliDepartment,
      // companyName,
      // adName,
      // adSum
    );
  });
}
if (formSubmitLoginTeacher) {
  formSubmitLoginTeacher.addEventListener('submit', e => {
    const email = document.getElementById('teacherEmail').value;
    const password = document.getElementById('teacherPassword').value;
    e.preventDefault();
    loginTeacher(email, password);
  });
}

if (applyAdForm) {
  applyAdForm.addEventListener('submit', e => {
    e.preventDefault();
    const { adId } = e.target.dataset;
    const formData = new FormData();
    const file = document.getElementById('cv').files[0];
    formData.append('cv', file);
    applyAd(formData, adId);
  });
}
if (cv) {
  const spanCv = document.getElementById('file-selected');
  const defaultLabelText = 'Dosya Seçilmedi';
  spanCv.textContent = defaultLabelText;
  cv.addEventListener('change', function() {
    console.log('burda');
    spanCv.textContent = cv.files[0].name;
  });
}
if (diploma) {
  const spanCv = document.getElementById('file-selected');
  const defaultLabelText = 'Dosya Seçilmedi';
  spanCv.textContent = defaultLabelText;
  diploma.addEventListener('change', function() {
    spanCv.textContent = diploma.files[0].name;
  });
}
if (stajBasari) {
  const spanCv = document.getElementById('file-selected');
  const defaultLabelText = 'Dosya Seçilmedi';
  spanCv.textContent = defaultLabelText;
  stajBasari.addEventListener('change', function() {
    spanCv.textContent = stajBasari.files[0].name;
  });
}
if (stajDosyası) {
  const spanCv = document.getElementById('file-selected');
  const defaultLabelText = 'Dosya Seçilmedi';
  spanCv.textContent = defaultLabelText;
  stajDosyası.addEventListener('change', function() {
    spanCv.textContent = stajDosyası.files[0].name;
  });
}
if (uploadStajBasari) {
  uploadStajBasari.addEventListener('submit', e => {
    e.preventDefault();
    const { adId } = e.target.dataset;
    console.log(adId);
    const formData = new FormData();
    const file = document.getElementById('stajBasari').files[0];
    formData.append('stajBasari', file);
    uploadStajBasariFunc(formData, adId);
  });
}
if (uploadStajDosya) {
  uploadStajDosya.addEventListener('submit', e => {
    e.preventDefault();
    const { adId } = e.target.dataset;
    const formData = new FormData();
    const file = document.getElementById('stajDosya').files[0];
    formData.append('stajDosya', file);
    uploadStajDosyası(formData, adId);
  });
}
if (certainStudentBtn) {
  certainStudentBtn.addEventListener('click', e => {
    const studentValue = 1;
    const { adId } = e.target.dataset;
    certainStudent(adId, studentValue);
  });
}
if (denyStudentBtn) {
  denyStudentBtn.addEventListener('click', e => {
    const studentValue = 2;
    const { adId } = e.target.dataset;
    certainStudent(adId, studentValue);
  });
}
// Common

if (logoutBtn) {
  logoutBtn.addEventListener('click', logout);
}
if (certainAdBtn) {
  certainAdBtn.addEventListener('click', e => {
    const { adId } = e.target.dataset;
    certainAd(adId);
  });
}

if (certainSchoolBtn) {
  certainSchoolBtn.addEventListener('click', e => {
    const schoolValue = 1;
    const { adId } = e.target.dataset;
    certainSchool(adId, schoolValue);
  });
}
if (denySchoolBtn) {
  denySchoolBtn.addEventListener('click', e => {
    const schoolValue = 2;
    const { adId } = e.target.dataset;
    certainSchool(adId, schoolValue);
  });
}
