// TODO make a reactive model, set it to window.myModel
import {createRoot} from "react-dom/client";
import { observable, reaction } from "mobx";
import { fetchUserData, fetchChallengeData, recordGuess} from "./firebase";
import { initAuth } from "./initAuth";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// This was needed. We later needed to change the resolvepromise to integrate actions later perhaps.
import { configure } from "mobx";
configure({ enforceActions: "never" });


import {model} from "/src/Model.js"
export const reactiveModel= observable(model);

//import hardcodeData from "/hardcodeData.json";
//reactiveModel.correctMovie = hardcodeData.targetMovie;
//reactiveModel.guesses = hardcodeData.guesses; 

// It keeps track of todays date. 
initAuth(reactiveModel);
fetchChallengeData(reactiveModel);


import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
const rootJSX = <ReactRoot model={reactiveModel} />
createRoot(document.getElementById('root')).render(rootJSX);



window.myModel= reactiveModel;


// Need to connect to the persistence. Can maybe do it during the authstateChange.
// Most/all of the code for reacting to state changes is in the the 