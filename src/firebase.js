import { initializeApp } from "firebase/app";
import { getAnalytics, setCurrentScreen } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getExpectedMovieID } from "./fetchData";
import { onAuthStateChanged } from "firebase/auth";
import { reactiveModel } from ".";

const firebaseConfig = {

    apiKey: "AIzaSyC6xKv_Z6MrjHdrt9Xl71HtHdlGqsez1NU",
  
    authDomain: "cine-wordle.firebaseapp.com",
  
    projectId: "cine-wordle",
  
    storageBucket: "cine-wordle.firebasestorage.app",
  
    messagingSenderId: "431725296637",
  
    appId: "1:431725296637:web:02ba64328e33733aaeb794",
  
    measurementId: "G-WQ0YF8FT4R"
  
};
  
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const auth = getAuth(app);

import {getFirestore, doc, setDoc, getDoc, onSnapshot, updateDoc, arrayUnion} from "firebase/firestore";
const db= getFirestore(app);

// make doc and setDoc available at the Console for testing
window.doc = doc
window.setDoc = setDoc
window.db = db


// We have at least two collections, one for the user and one for todays challenge.
const USERCOLLECTION = "users"
const CHALLENGECOLLECTSION = "challenge" 
const GUESSES = "guesses"



// Utility to get YYYY-MM-DD
function todayID() {
    return new Date().toISOString().split("T")[0];
  }


export function fetchUserData(user, reactiveModel){
    // The documents holding the users. 
    const userDocRef = doc(db, USERCOLLECTION, user.uid); 
    // uses userDocRef to make it a subCollection of users. 
    const guessDocRef = doc(userDocRef, GUESSES, todayID());

    getDoc(userDocRef).then(handleUsers)
    function handleUsers(userSnapShot){
        // If the user does not exist.
        if(!userSnapShot.exists()){
            let dataForCloud= {
                // uid is the name of the field we get from firebase
                uid: user.uid,
                email: user.email,
                statistics: {streak : 0}, 
            }
            // We create a new 
            setDoc(userDocRef,dataForCloud,{merge: true})
        }
    }
    // Listen for real time updates on collection for users. 
    // This now reacts as soon as any attributes changes. Could maybe be replaced with a custom function that only 
    // reacts to a subset of changes.
    onSnapshot(userDocRef, handleSnapshot)
    function handleSnapshot(doc){
        reactiveModel.currentUser = doc.data()
    }

    getDoc(guessDocRef).then(handleGuesses)
    function handleGuesses(guessesSnapShot){
        if(!guessesSnapShot.exists()){
            let letGuessData = {
                guess: [],
                win: false,
                loose: false 
            }
            setDoc(guessDocRef, letGuessData); 
        }
        // 
    }
    onSnapshot(guessDocRef, handleGuessSnapshot);
    function handleGuessSnapshot(snap){
        const data = snap.exists()
        ? snap.data() : { guess: [], win: false, loose: false };

        reactiveModel.guess  = data.guess; 
        reactiveModel.guesses  = data.guess; 
        reactiveModel.win = data.win;
        reactiveModel.loose = data.loose;

    }


}

export function updateUserStreak(userID, newStreak) {
  const ref = doc(db, USERCOLLECTION, userID);
  return updateDoc(ref, { "statistics.streak": newStreak })
    .then(() => console.log(`streak updated to ${newStreak}`))
    .catch(err => console.error("Error updating streak:", err));
}

export function updateDailyResult(userID, { win, loose }) {
  const ref = doc(db, USERCOLLECTION, userID, GUESSES, todayID());
  return updateDoc(ref, { win, loose })
    .then(() => console.log(`daily result updated (win:${win}, loose:${loose})`))
    .catch(err => console.error("Error updating daily result:", err));
}



/** 
 * Function for updating the guesses in the USERCOLLECTION. We will either need separate functions for changing the current challenge when the day changes and 
 * also need methods for changing the statistics.
 */
export function recordGuess(userID, guess) {
    const guessDocRef = doc(db, USERCOLLECTION, userID, GUESSES, todayID());
    return updateDoc(guessDocRef, {
      guess: arrayUnion(guess)
    })
    .then(() => console.log("guess recorded"))
    .catch(err => console.error("Error recording guess:", err));
  }

  
/**
 * A function for setting the correct movie in the challenge collection.. The value need to be set in the persistance since each user should have 
 * to guess the same movie presumably. If it does not exist do we set it. The id is todays data.
 *
*/
export function fetchChallengeData(reactiveModel){
    /**
     * For now is the unique identifier for the challenge the date. There are potential w
     */
    const date = todayID();
    const challengeDocRef = doc(db, CHALLENGECOLLECTSION, date); // the challengeID is that date 
    getDoc(challengeDocRef).then(handleChallenge) // might need to attach the onSnapshot in the end.

    function handleChallenge(challengeSnapshot){
        if(!challengeSnapshot.exists()){
          // If a challenge with todays data does not exist do we need to create it. 
          return getExpectedMovieID({
            minBudget: reactiveModel.minBudget,
            popular:   reactiveModel.popular
          })
          .then(function(movie){
            // Create and set the challengeDoc for the day. 
          setDoc(challengeDocRef, {
            challengeID: date,
            correctMovie: movie,
            leaderboard: {}
          });
          });
        }

    } 
    // This should always be activated when to code is run. 
    onSnapshot(challengeDocRef, handleSnapshot)
    function handleSnapshot(docSnap) {
        const data = docSnap.data() || {};
        reactiveModel.correctMovie = data.correctMovie;
        reactiveModel.challengeID  = data.challengeID;
        reactiveModel.leaderBoard  = data.leaderboard || {};
      }
}


/**
 * Atomically upsert this user's entry under leaderboard.<uid>
 */
export function updateLeaderboard(challengeID, entry) {
  const challengeDocRef = doc(db, CHALLENGECOLLECTSION, challengeID);
  // This uses Firestore’s “dot‐notation” to write a nested map field:
  return updateDoc(challengeDocRef, {
    [`leaderboard.${entry.uid}`]: entry
  });
}


/**
 *  Function for updating the correct movie in the challenge. This might not be necessary as there should 
 *  only be one movie per challenge, but can add if need arises.  
 * 
 */
export function updateCorrectMovie(challengeID, correctMovie) {
    const challengeDocRef = doc(db, CHALLENGECOLLECTSION, challengeID);
    return updateDoc(challengeDocRef, {
        correctMovie: correctMovie
    })
    .then(() => {
        console.log("Correct movie updated successfully.");
    })
    .catch((error) => {
        console.error("Error updating correct movie:", error);
    });
}


/**
 * If we also want to implement a global leaderboard could that be implemented in two ways primarily. 
 *    
 * 
 */




export { app, auth, db };