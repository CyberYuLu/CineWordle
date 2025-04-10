// TODO make a reactive model, set it to window.myModel
import { auth} from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {createRoot} from "react-dom/client";
import { observable } from "mobx";


// This was needed. We later needed to change the resolvepromise to integrate actions later perhaps.
import { configure } from "mobx";
configure({ enforceActions: "never" });


import {model} from "/src/Model.js"
const reactiveModel= observable(model);

import hardcodeData from "/hardcodeData.json";
reactiveModel.correctMovie = hardcodeData.targetMovie;
reactiveModel.guesses = hardcodeData.guesses;

onAuthStateChanged(auth, (user) => {
  if (user) {
    // The user is logged in; update your model with this user's details.
    model.currentUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
      // 
    };
  } else {
    // No user is signed in; clear the current user from your model.
    model.currentUser = null;
  }
});

import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
const rootJSX = <ReactRoot model={reactiveModel} />
createRoot(document.getElementById('root')).render(rootJSX);

window.myModel= reactiveModel;



