// TODO make a reactive model, set it to window.myModel
import { auth} from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {createRoot} from "react-dom/client";
import { observable, reaction } from "mobx";
import { fetchUserData, fetchChallengeData, recordGuess} from "./firebase";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// This was needed. We later needed to change the resolvepromise to integrate actions later perhaps.
import { configure } from "mobx";
configure({ enforceActions: "never" });


import {model} from "/src/Model.js"
const reactiveModel= observable(model);

//import hardcodeData from "/hardcodeData.json";
//reactiveModel.correctMovie = hardcodeData.targetMovie;
//reactiveModel.guesses = hardcodeData.guesses; 


// It keeps track of todays date. 
fetchChallengeData(reactiveModel); 

onAuthStateChanged(auth, (user) => {
  if (user) {
    // We set these values here since
    reactiveModel.currentUser = {userID: user.uid, email: user.email,};
    fetchUserData(user, reactiveModel)
  } else {
    // No user is signed in; clear the current user from your model.
    reactiveModel.currentUser = null;
    
  }
});





import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
const rootJSX = <ReactRoot model={reactiveModel} />
createRoot(document.getElementById('root')).render(rootJSX);



window.myModel= reactiveModel;


// Need to connect to the persistence. Can maybe do it during the authstateChange.
// Most/all of the code for reacting to state changes is in the the 
