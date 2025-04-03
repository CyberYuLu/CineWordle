import { observer } from "mobx-react-lite";
import { MainView } from "/src/views/mainView.jsx";
import { MainGame } from "/src/reactjs/mainGamePresenter.jsx";


const Main = observer(          
    function GameRender(props){
        return (
        <div>
            <MainView/>
            <MainGame/>

        </div>);
    }
);

export { Main };