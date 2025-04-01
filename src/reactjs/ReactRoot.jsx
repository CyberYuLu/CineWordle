import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Game } from "./gamePresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { createLoginPresenter } from "./loginPresenter.jsx";
import { createRegisterPresenter } from "./registerPresenter.jsx";

function LoginWrapper({ model }) {
    const Login = createLoginPresenter(model);
    return <Login />;
}

function RegisterWrapper({ model }) {
    const Register = createRegisterPresenter(model);
    return <Register />;
}

function makeRouter(model) {
    return createHashRouter([
        { path: "/", element: <Game model={model} /> },  // default route goes to search
        { path: "/game", element: <Game model={model} /> },
        { path: "/login", element: <LoginWrapper model={model}/>},
        { path: "/register", element: <RegisterWrapper model={model}/> },
    ]);
}

const ReactRoot = observer(  
    function ReactRoot(props){
        return (
            <div className="flexParent">
                <div className="sidebar"><Sidebar model={props.model} /></div>
                <div className="mainContent">
                    <RouterProvider router={makeRouter(props.model)} />
                </div>
            </div>
        );	
	}
)

 



export { ReactRoot }
