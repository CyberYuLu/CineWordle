import { observer } from "mobx-react-lite";
import { useState } from "react";
import { MainView } from "/src/views/mainView.jsx";
import { MainGame } from "/src/reactjs/mainGamePresenter.jsx";
import { WinningView } from "/src/views/winningView.jsx";
import { LosingView } from "/src/views/losingView.jsx";



const Main = observer(
    function GameRender(props) {
        const [win, setWin] = useState(false);
        const [lose, setlose] = useState(false);


        //temporay function to simulate winning state
        function toggleWinACB() {
            setWin(true);

            console.log("Toggling win state" + win);
        };

        function disableWinningScreanACB(){
            setWin(false);
            console.log("Toggling win state" + win);
        };

        //same for loosing stage 
        function toggleloseACB() {
            setlose(true);

            console.log("Toggling lose state" + lose);
        };

        function disableLosingScreanACB(){
            setlose(false);
            console.log("Toggling lose state" + lose);
        };


        return (
            <div>
                <MainView model={props.model}/>
                <MainGame model={props.model}/>
                {win && <WinningView onButtonClick={disableWinningScreanACB} model={props.model}/>}
                {lose && <LosingView onButtonClick={disableLosingScreanACB} model={props.model}/>}

                <button onClick={toggleWinACB}>Toggle Win</button>
                <button onClick={toggleloseACB}>Toggle lose</button>

            </div>
        );
    }
);

export { Main };

