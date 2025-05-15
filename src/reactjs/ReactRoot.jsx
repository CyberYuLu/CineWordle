import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Main } from "./mainMenuPresenter.jsx";
import {Introduction} from "./introductionPresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { createLoginPresenter } from "./loginPresenter.jsx";
import { createRegisterPresenter } from "./registerPresenter.jsx";
import { TutorialPresenter } from "./tutorialPresenter.jsx";
import { ProfilePresenter } from "./profilePresenter.jsx";
import { LeaderboardPresenter } from "./leaderboardPresenter.jsx";
import {BlurredGame} from "./blurredGamePresenter.jsx"
import { SuspenseView } from "../views/suspenseView.jsx";

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
        { path: "/", element: <Introduction model={model} /> },  // default route goes to search
        {path: "/intro", element: <Introduction model={model} /> }, // default route goes to search
        { path: "/game", element: <Main model={model} /> },
        { path: "/login", element: <LoginWrapper model={model}/>},
        { path: "/register", element: <RegisterWrapper model={model}/> },
        { path: "/how-to-play", element: <TutorialPresenter model={model} /> },
        { path: "/profile", element: <ProfilePresenter model={model} /> },
        { path: "/leaderboard", element: <LeaderboardPresenter model={model} /> },
        {/** If we want to to include the other game */}, 
        {path: "/blurredGame", element: <BlurredGame model={model} maxAttempts={10} mode={'blur-level'}/> }
  ]);
}

const ReactRoot = observer(  
    function ReactRoot(props){
        if(!props.model.authInitialized){
            return <SuspenseView/>
        }

    
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
