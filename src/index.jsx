// TODO make a reactive model, set it to window.myModel
import { auth} from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import {createRoot} from "react-dom/client";
import { observable } from "mobx";


// This was needed. We later needed to change the resolvepromise to integrate actions later perhaps.
import { configure } from "mobx";
configure({ enforceActions: "never" });


import {userModel, appModel} from "/src/Model.js"
const reactiveUserModel= observable(userModel);
const reactiveAppModel = observable(appModel);


onAuthStateChanged(auth, (user) => {
  if (user) {
    // The user is logged in; update your model with this user's details.
    userModel.currentUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
      // 
    };
  } else {
    // No user is signed in; clear the current user from your model.
    userModel.currentUser = null;
  }
});

import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
const rootJSX = <ReactRoot model={reactiveModel} />
createRoot(document.getElementById('root')).render(rootJSX);

window.appModel= reactiveAppModel;
window.userModel= reactiveUserModel;
