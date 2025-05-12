import { observer } from "mobx-react-lite";
import { LoginView } from "/src/views/loginView.jsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.js";
<<<<<<< HEAD
import { useState } from 'react';
=======
>>>>>>> refs/remotes/origin/main
import { useNavigate } from "react-router-dom";

class LoginPresenter {
    constructor(model) {
        this.model = model;
    }

    signIn = async (email, password) => {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        this.model.setCurrentUser(user);
        return user;
    };
}

function createLoginPresenter(model) {
    const presenter = new LoginPresenter(model);

    const Login = observer(function LoginRender() {
<<<<<<< HEAD
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
        const navigate = useNavigate();  

        async function handleSubmit(e) {
            e.preventDefault();
            setErrorMessage('');
            setSuccessMessage('');
            setLoading(true);

            try {
                await presenter.signIn(email, password);
                setSuccessMessage('Sign in successful!');
                setTimeout(() => navigate("/game"), 500);
            } catch (error) {
                setErrorMessage(`Sign in failed: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        return (
            <LoginView
                email={email}
                password={password}
                loading={loading}
                errorMessage={errorMessage}
                successMessage={successMessage}
                setEmail={setEmail}
                setPassword={setPassword}
                handleSubmit={handleSubmit}
            />
        );
=======
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
>>>>>>> refs/remotes/origin/main
    });

    return Login;
}
export { createLoginPresenter };
