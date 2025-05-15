import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchUserData } from "./firebase";


export function initAuth(reactiveModel) {
  const auth = getAuth();

  // start in “loading” mode
  reactiveModel.authInitialized = false;

  onAuthStateChanged(auth, (user) => {
    // wrap in action if you enforceActions
    if (user) {
      reactiveModel.currentUser = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName
      };
      fetchUserData(user, reactiveModel);
    } else {
      reactiveModel.currentUser = null;
    }
    reactiveModel.authInitialized = true;
  });
}
