import { observer } from "mobx-react-lite";
import { useState } from "react";
import { MainGameView } from "/src/views/mainGameView.jsx";
import { SearchMovieView } from "/src/views/searchMovieView.jsx";
import { HintsPresenter } from "./hintsPresenter.jsx";
import { NotificationView } from "/src/views/notificationView.jsx";

const MainGame = observer(
    function GameRender(props) {
        const [text, setText] = useState("");    

        // state for notification message
        const [notification, setNotification] = useState(""); // display notification message
        const [isCorrect, setIsCorrect] = useState(null); // to track if the guess is correct

        function updateSearchQueryACB(inputTyped) {
            console.log("input typed", inputTyped);
            setText(inputTyped);
        }

        function performSearchACB() {
            if (!text.trim()) {
                setNotification("Please enter a valid movie name.");
                setIsCorrect(false);
                return;
            }

            const newGuess = {
                name: text,
                year: 2000, 
                genre: ["Thriller"],   
                prop1: "Stockholm",
                prop2: "Garonne",
                img: "img/poster1.jpg"
            };

            console.log("Adding guess:", props.model.searchResultsPromiseState);
            props.model.addGuessForUser(newGuess);
            console.log("Updated guesses:", props.model.guesses);

            //check if the guess is correct 
            //TODO us model method ? 
            const isGuessCorrect = newGuess.name === props.model.correctMovie.name;
            setIsCorrect(isGuessCorrect);

            //set notification msg
            setNotification(isGuessCorrect ? "Correct guess!" : `Your guess "${text}" has been added!`);
            
            // clear the input field
            setText("");

            // clear after 3 s
            setTimeout(() => setNotification(""), 3000);
        }

        return (
            <div>
                <SearchMovieView 
                    text={text} 
                    onSearchChange={updateSearchQueryACB} 
                    onSearchButtonClick={performSearchACB}  
                />

                <NotificationView notification={notification} isCorrect={isCorrect} />

                <HintsPresenter model={props.model} />

                <MainGameView 
                    targetMovie={props.model.correctMovie} 
                    guesses={props.model.guesses} 
                    model={props.model}
                />
            </div>
        );
    }
);

export { MainGame };
