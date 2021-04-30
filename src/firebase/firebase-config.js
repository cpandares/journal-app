import firebase  from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


  const firebaseConfig = {
    apiKey: "AIzaSyBwNOXXnovxLRwEYsleSnB9gx8Yp7lqzC0",
    authDomain: "journal-reac-app.firebaseapp.com",
    projectId: "journal-reac-app",
    storageBucket: "journal-reac-app.appspot.com",
    messagingSenderId: "335423889008",
    appId: "1:335423889008:web:08884656a28e14f92e5eb5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

  export {
      db,
      googleAuthProvider,
      firebase
  }
