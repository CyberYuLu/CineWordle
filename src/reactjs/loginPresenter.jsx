import { observer } from "mobx-react-lite";
import { LoginView } from "/src/views/loginView.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
import { useNavigate } from "react-router-dom";

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
        const navigate = useNavigate(); // Initialize the navigate function

        async function handleSignIn(email, password) {
            try {
                await presenter.signIn(email, password);
                navigate("/game"); // Redirect to the main menu/game after successful login
            } catch (error) {
                console.error("Login failed:", error);
            }
        }

        return <LoginView signIn={handleSignIn} />;
    });

    return Login;
}
export { createLoginPresenter };
