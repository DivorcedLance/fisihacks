//Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAni9CQ9jMoiLgxx4hBfzFYXKK5MSP_lys',
  authDomain: 'fisihacks.firebaseapp.com',
  projectId: 'fisihacks',
  storageBucket: 'fisihacks.appspot.com',
  messagingSenderId: '370303690000',
  appId: '1:370303690000:web:95972009937492ec73f195',
};
// TO ANYONE READING THE CODE:
// This is a early version of the webpage. I'm aware of the security risks of having the API key in the code. Soon I'll be using a backend (Python Flask or Django) to handle the requests. This also will be use to fix the obvious vulnerability of the index-authorized page.
// -Vergara Pachas Jose Luis

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
