import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBlK6I-wBEXQzuR3Q1JT4shH8QPLsDRoAQ",
  authDomain: "dev-mobile-4d076.firebaseapp.com",
  projectId: "dev-mobile-4d076",
  storageBucket: "dev-mobile-4d076.firebasestorage.app",
  messagingSenderId: "814261771687",
  appId: "1:814261771687:web:6b645a5dd6d78bef27ea82",
  measurementId: "G-HWZTEXS5WF"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);