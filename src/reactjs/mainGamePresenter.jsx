//mainGamePresenter.jsx
import { observer } from "mobx-react-lite";
import { MainGameView } from "/src/views/mainGameView.jsx";
import data from '/hardcodeData.json';




const MainGame = observer(          
    function GameRender(props){
        return <MainGameView targetMovie={data.targetMovie} guesses={data.guesses} />;
    }
);

export { MainGame };