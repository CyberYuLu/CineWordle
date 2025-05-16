import { observer } from "mobx-react-lite";
import { useState } from "react";
import { MainView } from "/src/views/mainView.jsx";
import { MainGame } from "/src/reactjs/mainGamePresenter.jsx";
import { WinningView } from "/src/views/winningView.jsx";
import { LosingView } from "/src/views/losingView.jsx";



const Main = observer(
    function GameRender(props) {


        //temporay function to simulate winning state
        function toggleWinACB() {
            props.model.setDisplayWinningScreen(true);
        };

        function disableWinningScreanACB(){
            props.model.setDisplayWinningScreen(false);
        };

        //same for loosing stage 
        function toggleloseACB() {
            props.model.setDisplayLoosingScreen(true);
        };

        function disableLosingScreanACB(){
            props.model.setDisplayLoosingScreen(false);
        };


        return (
            <div>
                <MainView model={props.model}/>
                <MainGame model={props.model}/>
                {props.model && props.model.displayWinningScreen && <WinningView onButtonClick={disableWinningScreanACB} model={props.model}/>}
                {props.model && props.model.displayLoosingScreen && <LosingView onButtonClick={disableLosingScreanACB} model={props.model}/>}

                <button onClick={toggleWinACB}>Toggle Win</button>
                <button onClick={toggleloseACB}>Toggle lose</button>

            </div>
        );
    }
);

export { Main };

