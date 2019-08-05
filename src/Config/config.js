import firebase from "firebase";

// Your web app's Firebase configuration
const DB_CONFIG = {
    apiKey: "AIzaSyCjlkxhRjZayxGX7yEWc4uERNXhTfiQp2s",
    authDomain: "notetakingapp-319a5.firebaseapp.com",
    databaseURL: "https://notetakingapp-319a5.firebaseio.com",
    projectId: "notetakingapp-319a5",
    storageBucket: "",
    messagingSenderId: "607723596033",
    appId: "1:607723596033:web:bbef1fa20ff45560"
  };

  const Firebase = firebase.initializeApp(DB_CONFIG);
  
  export default Firebase;
