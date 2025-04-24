import { initializeApp } from "firebase/app";
import { getAnalytics, setCurrentScreen } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getExpectedMovieID } from "./fetchData";

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



export function fetchUserData(user, reactiveModel){
    // The documents holding the users. 
    const userDocRef = doc(db, USERCOLLECTION, user.uid); 
    getDoc(userDocRef).then(handleUsers)
    function handleUsers(userSnapShot){
        // If the user does not exist.
        if(!userSnapShot.exists()){
            let dataForCloud= {
                // uid is the name of the field we get from firebase
                uid: user.uid,
                email: user.email,
                currentChallenge: {challengeID: null, guesses: []},   // contans the challengeID (the current data)and guesses
                statistics: {}, 
            }
            // We create a new 
            setDoc(userDocRef,dataForCloud,{merge: true})
        }
    }
    // Listen for real time updates on collection for users. 
    // This now reacts as soon as any attributes changes. Could maybe be replaced with a custom function that only 
    // react to a subset of attributes.
    onSnapshot(userDocRef, handleSnapshot)
    function handleSnapshot(doc){
        reactiveModel.currentUser = doc.data()
    }
}

/**
 * Function for updating the guesses in the USERCOLLECTION. We will either need separate functions for changing the current challenge when the day changes and 
 * also need methods for changing the statistics.
 * 
 * @param guess should contain all the attributes of the guess.
 * 
 */
export function recordGuess(userID, guess){
    const userDocRef = doc(db, USERCOLLECTION, userID); 
    return updateDoc(userDocRef, {
        "currentChallenge.guesses" : arrayUnion(guess)
    })
    .then(() => {
        // 
        console.log("guesses recorded successfully.")
    }
    ).catch((error)=> {
        console.error("Error recording guess:", error);
    }
    );
    
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
    const date = new Date().toISOString().split("T")[0];;
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
            return setDoc(challengeDocRef, {
                challengeID: date,
                correctMovie: movie,
                // The leaderboard for todays challenge, not the 
                leaderboard: {}

            }, {merge: true});
          });
        }

    } 
    // This should always be activated when to code is run. 
    onSnapshot(challengeDocRef, handleSnapshot)
    function handleSnapshot(docSnap) {
        const data = docSnap.data() || {};
        reactiveModel.correctMovie = data.correctMovie;
        reactiveModel.challengeID  = data.challengeID;
        reactiveModel.leaderboard  = data.leaderboard || {};
      }
}


export function updateLeaderboard(challengeID, leaderboardEntry) {
    const challengeDocRef = doc(db, CHALLENGECOLLECTSION, challengeID);
    return updateDoc(challengeDocRef, {
        leaderboard: arrayUnion(leaderboardEntry)
    })
    .then(() => {
        console.log("Leaderboard updated successfully.");
    })
    .catch((error) => {
        console.error("Error updating leaderboard:", error);
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
 *  - The first option is to add, total games played, total attemps and average attemps to the statistics field for the users. 
 *  - The second option is to add another collection with userID, total attemps, total challanges and average attempts instead of tying thosse values to the user.
 * 
 */




export { app, auth };