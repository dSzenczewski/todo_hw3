import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyB9pow_XLfQinvdIfqWsFbTCNDRRgf3_Co",
    authDomain: "todo-hw3-43958.firebaseapp.com",
    databaseURL: "https://todo-hw3-43958.firebaseio.com",
    projectId: "todo-hw3-43958",
    storageBucket: "todo-hw3-43958.appspot.com",
    messagingSenderId: "1095805066824",
    appId: "1:1095805066824:web:e8c17e6c23fe8079f4427d",
    measurementId: "G-MJEZPEE679"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;