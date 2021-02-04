/* eslint-disable */

import { showAlert } from './alert.js';
import axios from 'axios';
import '@babel/polyfill';
const lessonCode = document.querySelector('#code');

export const loginCompany = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/company/login',
      data: { email: email, password: password }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Giriş Başarılı!');
      window.setTimeout(() => {
        location.assign('/companyProfile');
      }, 1500);
    }
    // console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const loginStudent = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/student/login',
      data: { email: email, password: password }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Giriş Başarılı!');
      window.setTimeout(() => {
        location.assign('/allAds');
      }, 1500);
    }
    // console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const loginTeacher = async (email, password) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/teacher/login',
      data: { email: email, password: password }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Giriş Başarılı!');
      window.setTimeout(() => {
        location.assign('/waitingVerify');
      }, 1500);
    }
    // console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const signupStudent = async (
  studentName,
  studentNo,
  studentAvg,
  studentClass,
  studentEposta,
  studentPass
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/student/signup',
      data: {
        name: studentName,
        studentNo: studentNo,
        studentAvg: studentAvg,
        studentClass: studentClass,
        email: studentEposta,
        password: studentPass
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Kayıt Başarılı, Giriş Yapıyorsunuz!');
      window.setTimeout(() => {
        location.assign('/allAds');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const applyAd = async (FormData, adId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/student/ad/${adId}`,
      data: FormData
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Başvuru Başarılı!');
      window.setTimeout(() => {
        location.assign('/allAds');
      }, 1500);
    }
    // console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const certainAd = async adId => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/student/myAds/:id',
      data: {
        adId: adId
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Staj Onayı Başarılı!');
      window.setTimeout(() => {
        location.assign('/allAds');
      }, 1500);
    }
  } catch (err) {
    console.log(err.message);
    // showAlert('error', err.res.message);
  }
};
export const certainSchool = async (adId, schoolVerify) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/teacher/waitingVerify/:id',
      data: {
        adId: adId,
        schoolVerify: schoolVerify
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'İşlem Başarılı!');
      window.setTimeout(() => {
        location.assign('/waitingVerify');
      }, 1500);
    }
  } catch (err) {
    console.log(err.message);
    // showAlert('error', err.res.message);
  }
};
export const certainStudent = async (adId, studentValue) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: '/api/v1/company/appliedStudents/:id',
      data: {
        adId: adId,
        companyVerify: studentValue
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'İşlem Başarılı!');
      window.setTimeout(() => {
        location.assign('/appliedStudents');
      }, 1500);
    }
  } catch (err) {
    console.log(err.message);
    // showAlert('error', err.res.message);
  }
};
// export const loginAdmin = async (email, password) => {
//   try {
//     const res = await axios({
//       method: 'POST',
//       url: '/api/v1/users/admin',
//       data: { email: email, password: password }
//     });
//     if (res.data.status === 'success') {
//       showAlert('success', 'Giriş Başarılı!');
//       window.setTimeout(() => {
//         location.assign('/adminLesson');
//       }, 1500);
//     }
//     // console.log(res);
//   } catch (err) {
//     showAlert('error', err.response.data.message);
//   }
// };
export const logout = async () => {
  try {
    const res = await axios({
      method: 'GET',
      url: '/api/v1/student/logout'
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Başarıyla Çıkış Yapıldı !');
      window.setTimeout(() => {
        location.assign('/');
      }, 1000);
    }
  } catch (err) {
    console.log(err.response);
    showAlert('error', 'Çıkış Sırasında Hata Oluştu !');
  }
};
export const signupCompany = async (
  name,
  email,
  password
  //   ,passwordConfirm
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/company/signup',
      data: {
        companyName: name,
        email: email,
        password: password
      }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Kayıt Başarılı, Giriş Yapıyorsunuz!');
      window.setTimeout(() => {
        location.assign('/companyProfile');
      }, 1500);
    }
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const addAd = async (
  // yetkiliName,
  // dipNo,
  // yetkiliUni,
  // yetkiliDepartment,
  // companyName,
  // adName,
  // adSum
  formData
) => {
  try {
    const res = await axios({
      method: 'POST',
      url: '/api/v1/company/createAd',
      data: formData
      // {
      //   companyName: companyName,
      //   adName: adName,
      //   adSum: adSum,
      //   company: user_id,
      //   yetkiliAdi: yetkiliName,
      //   yetkiliDipNo: dipNo,
      //   yetkiliUni: yetkiliUni,
      //   yetkiliBolum: yetkiliDepartment
      // }
    });
    if (res.data.status === 'success') {
      showAlert('success', 'İlan Başarıyla Oluşturuldu!');
      window.setTimeout(() => {
        location.assign('/myAdsCompany');
      }, 1500);
    }
    // console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
export const uploadStajDosyası = async (FormData, adId) => {
  try {
    const res = await axios({
      method: 'POST',
      url: `/api/v1/student/finalAd/${adId}`,
      data: FormData
    });
    if (res.data.status === 'success') {
      showAlert('success', 'Başvuru Başarılı!');
      window.setTimeout(() => {
        location.assign('/allAds');
      }, 1500);
    }
    // console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};

export const uploadStajBasariFunc = async (FormData, adId) => {
  try {
    const res = await axios({
      method: 'PATCH',
      url: `/api/v1/company/certainAdsCompany/${adId}`,
      data: FormData
    });
    if (res.data.status === 'success') {
      showAlert('success', 'İşlem Başarılı!');
      window.setTimeout(() => {
        location.assign('/myAdsCompany');
      }, 1500);
    }
    // console.log(res);
  } catch (err) {
    showAlert('error', err.response.data.message);
  }
};
