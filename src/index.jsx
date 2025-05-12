// TODO make a reactive model, set it to window.myModel
import { auth} from "./firebase";
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

import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
const rootJSX = <ReactRoot model={reactiveModel} />
createRoot(document.getElementById('root')).render(rootJSX);

// -------------- WINNING MANAGEMENT + HINT MANAGEMENT -------------------------
// handle winning and loosing with side effects.
reaction(ifTooMuchGuessACB, triggerLooseACB);
reaction(isCorrectGuessACB, triggerWinACB);
reaction(ifFirstHintACB, triggerFirstHintACB);
reaction(ifSecondHintACB, triggerSecondHintACB);

function ifTooMuchGuessACB(){
    if (reactiveModel && reactiveModel.guesses.length >= reactiveModel.guessForLoose) 
      {
        
        return true;}
};

function triggerLooseACB(){
    console.log("Too much guess, triggering loose")
    reactiveModel.setLoose(true);
}

function isCorrectGuessACB() {
    if (reactiveModel && reactiveModel.guesses.length > 0) {
        const lastGuess = reactiveModel.guesses[reactiveModel.guesses.length - 1];
        return lastGuess.id === reactiveModel.correctMovie.id;
    }
    return false;
}

function triggerWinACB() {
    console.log("Correct guess, triggering win")
    reactiveModel.setWin(true);}

function ifFirstHintACB(){
    if (reactiveModel && reactiveModel.guesses.length >= reactiveModel.guessForFirstHint) 
        return true;
}

function triggerFirstHintACB()
{
    reactiveModel.setFirstHint(true);
    console.log("First hint triggered")
}

function ifSecondHintACB(){
    if (reactiveModel && reactiveModel.guesses.length >= reactiveModel.guessForSecondHint) 
        return true;
}

function triggerSecondHintACB()
{
    reactiveModel.setSecondHint(true);
    console.log("Second hint triggered")
}

// ------------------ END OF WINNING MANAGEMENT + HINT MANAGEMENT -------------------------

window.myModel= reactiveModel;


// Need to connect to the persistence. Can maybe do it during the authstateChange.
// Most/all of the code for reacting to state changes is in the the 
