import { observer } from "mobx-react-lite";
import { GameView } from "/src/views/GameView.jsx";

const Game = observer(          
    function GameRender(props){
        return <GameView/>;
    }
);

export { Game };