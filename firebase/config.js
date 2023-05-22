// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAgqD2x9n1Qa-DzdcN_d9eGrTBu86KSPk8',
  authDomain: 'lpu-lms.firebaseapp.com',
  projectId: 'lpu-lms',
  storageBucket: 'lpu-lms.appspot.com',
  messagingSenderId: '252526384318',
  appId: '1:252526384318:web:e7f395edb3af0e4053baef',
};

let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export default firebase_app;
