import React from "react";
import { observer } from "mobx-react-lite";
import "/src/style.css";

export const WinningView = observer((props) => {
    const movie = {
        name: props.model.correctMovie.name,
        description: "A thrilling tale of revenge and redemption.",
        image: props.model.correctMovie.img,
    };

    const numberOfGuesses = 5; // This should be passed as a prop or calculated based on the game state

    return (
        <div className="winning-view">
            <h1>Congratulations! 🎉</h1>
            <p>The correct movie was guessed in {numberOfGuesses} guesses!</p>

            <div className="movie-details">
                <h2>{movie.name}</h2>
                <p>{movie.description}</p>
                <img src={movie.image} alt={movie.name} />
            </div>
            <button onClick={props.onButtonClick}>Exit !</button>
        </div>
    );
});
