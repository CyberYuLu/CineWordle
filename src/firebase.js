import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

    apiKey: "AIzaSyC6xKv_Z6MrjHdrt9Xl71HtHdlGqsez1NU",
  
    authDomain: "cine-wordle.firebaseapp.com",
  
    projectId: "cine-wordle",
  
    storageBucket: "cine-wordle.firebasestorage.app",
  
    messagingSenderId: "431725296637",
  
    appId: "1:431725296637:web:02ba64328e33733aaeb794",
  
    measurementId: "G-WQ0YF8FT4R"
  
};
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const auth = getAuth(app);

export { app, auth };