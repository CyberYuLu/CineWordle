import { observer } from "mobx-react-lite";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { RegisterView } from "/src/views/registerView.jsx";

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
        return <RegisterView register={presenter.register} />;
    });

    return Register;
}

export { createRegisterPresenter };
