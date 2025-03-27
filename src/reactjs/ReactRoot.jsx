import { observer } from "mobx-react-lite";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { Game } from "./gamePresenter.jsx";
import { Sidebar } from "./sidebarPresenter.jsx";
import { Login } from "./loginPresenter.jsx";



function makeRouter(model) {
    return createHashRouter([
        { path: "/", element: <Game model={model} /> },  // default route goes to search
        { path: "/game", element: <Game model={model} /> },
        { path: "/login", element: <Login model={model} /> },
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
