import { observer } from "mobx-react-lite";
import { LoginView } from "/src/views/loginView.jsx";

const Login = observer(          
    function LoginRender(props){
        return <LoginView/>;
    }
);

export { Login };
