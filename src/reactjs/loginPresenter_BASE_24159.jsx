import { observer } from "mobx-react-lite";
import { LoginView } from "/src/views/loginView.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";

class LoginPresenter {
    constructor(model) {
        this.model = model;
    }

    signIn = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            this.model.user = user;
            return user;
        } catch (error) {
            console.error("Error signing in:", error.code, error.message);
            throw error;
        }
    };
}

function createLoginPresenter(model) {
    const presenter = new LoginPresenter(model);

    const Login = observer(function LoginRender() {
        return <LoginView signIn={presenter.signIn} />;
    });

    return Login;
}

export { createLoginPresenter };
