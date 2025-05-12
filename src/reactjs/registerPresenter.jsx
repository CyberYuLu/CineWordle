import { observer } from "mobx-react-lite";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { RegisterView } from "/src/views/registerView.jsx";
import { useNavigate } from "react-router-dom";

class RegisterPresenter {
    constructor(model) {
        this.model = model;
    }

    register = async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            this.model.user = user;
            return user;
        } catch (error) {
            console.error("Error creating user:", error.code, error.message);
            throw error;
        }
    };
}

function createRegisterPresenter(model) {
    const presenter = new RegisterPresenter(model);

    const Register = observer(function RegisterRender() {
        const navigate = useNavigate(); // Initialize the navigate function

        async function handleRegister(email, password) {
            try {
                await presenter.register(email, password);
                navigate("/game"); // Redirect to the main menu/game
            } catch (error) {
                console.error("Registration failed:", error);
            }
        }

        return <RegisterView register={handleRegister} />;
    });

    return Register;
}
export { createRegisterPresenter };
