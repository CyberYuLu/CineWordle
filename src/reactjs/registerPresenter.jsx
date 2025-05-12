import { observer } from "mobx-react-lite";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { RegisterView } from "/src/views/registerView.jsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

class RegisterPresenter {
    constructor(model) {
        this.model = model;
    }

    register = async (email, password) => {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        this.model.setCurrentUser(user);
        return user;
    };
}

function createRegisterPresenter(model) {
    const presenter = new RegisterPresenter(model);

    const Register = observer(function RegisterRender() {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const [errorMessage, setErrorMessage] = useState('');
        const [successMessage, setSuccessMessage] = useState('');
        const navigate = useNavigate();

        async function handleSubmit(e) {
            e.preventDefault();
            setLoading(true);
            setErrorMessage('');
            setSuccessMessage('');

            try {
                await presenter.register(email, password);
                setSuccessMessage('Registration successful!');
                setTimeout(() => navigate("/game"), 500);
            } catch (error) {
                setErrorMessage(`Registration failed: ${error.message}`);
            } finally {
                setLoading(false);
            }
        }

        return (
            <RegisterView
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
    });

    return Register;
}
export { createRegisterPresenter };
