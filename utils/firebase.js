import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBsnVjQMmX5BxXOu7_j7MxOj77FecI24ZI",
  authDomain: "teamwork-37274.firebaseapp.com",
  projectId: "teamwork-37274",
  storageBucket: "teamwork-37274.appspot.com",
  messagingSenderId: "1042046401974",
  appId: "1:1042046401974:web:324b57d6acc435ca8d9517",
  measurementId: "G-EC7N22C6CP",
});

export const storage = app.storage();
