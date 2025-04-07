import { observer } from "mobx-react-lite";
import { useState } from "react";
import { MainGameView } from "/src/views/mainGameView.jsx";
import { SearchMovieView } from "/src/views/searchMovieView.jsx";

import initialData from '/hardcodeData.json';

const MainGame = observer(
    function GameRender(props) {

        // these two const will be in the model after 
        const [text, setText] = useState("");                   
        const [gameData, setGameData] = useState(initialData);  

        function updateSearchQueryACB(inputTyped) {
            console.log("input typed", inputTyped);
            setText(inputTyped);
        }

        function performSearchACB() {
            if (!text.trim()) return;

            const newGuess = {
                name: text,
                year: 2000,                      
                genre: ["Unknown"],              
                prop1: "Unknown",                
                prop2: "Unknown",                
                img: "/img/Oppenheimer_(film).jpg" 
            };

            console.log("Adding guess:", newGuess);

            setGameData(prevData => ({
                ...prevData,
                guesses: [...prevData.guesses, newGuess]
            }));
        }

        return (
            <div>
                <SearchMovieView 
                    text={text} 
                    onSearchChange={updateSearchQueryACB} 
                    onSearchButtonClick={performSearchACB}  
                />

                <MainGameView 
                    targetMovie={gameData.targetMovie} 
                    guesses={gameData.guesses} 
                />
            </div>
        );
    }
);

export { MainGame };
