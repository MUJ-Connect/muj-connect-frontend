// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCv7Ti2oMl2a-ivnl0_nnQXeKKkq6iA6lg',
  authDomain: 'muj-connect.firebaseapp.com',
  projectId: 'muj-connect',
  storageBucket: 'muj-connect.appspot.com',
  messagingSenderId: '311296079918',
  appId: '1:311296079918:web:d1585fa95c6651910247bf',
};

// Initialize Firebase
let app;
if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseConfig);
}

export default app;
