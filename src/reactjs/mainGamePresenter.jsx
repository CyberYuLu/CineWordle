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
                genre: ["Thriller"],   
                prop1 : "Stockholm",
                prop2 : "Garonne",
                img : "img/poster1.jpg"
            };
            console.log("Adding guess:", props.model.searchResultsPromiseState);
            props.model.addGuessForUser(newGuess);
            console.log("Updated guesses:", props.model.guesses);

    
        }

        return (
            <div>
                <SearchMovieView 
                    text={text} 
                    onSearchChange={updateSearchQueryACB} 
                    onSearchButtonClick={performSearchACB}  
                />

                <MainGameView 
                    targetMovie={props.model.correctMovie} 
                    guesses={props.model.guesses} 
                    model ={props.model}
                    
                />
            </div>
        );
    }
);

export { MainGame };
