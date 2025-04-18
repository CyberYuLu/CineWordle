import React from "react";
import { observer } from "mobx-react-lite";
import "/src/style.css";

export const LosingView = observer((props) => {
    const movie = {
        name: props.model.correctMovie.name,
        description: props.model.correctMovie.summary,
        image: props.model.correctMovie.img,
    };

    const numberOfGuesses = props.model.guesses.length;    


    return (
        <div className="winning-view">
            <h1>Game Over 😞</h1>
            <p>Sorry, you couldn't guess the correct movie.</p>

            <div className="movie-details">
                <h2>The correct answer was: {movie.name}</h2>
                <p>{movie.description}</p>
                <img src={movie.image} alt={movie.name} />
            </div>
            <button onClick={props.onButtonClick}>Try Again</button>
        </div>
    );
});