import React from "react";
import { observer } from "mobx-react-lite";
import "/src/style.css";

export const LosingView = observer((props) => {
    const movie = {
        name: props.model.correctMovie.title,
        description: props.model.correctMovie.overview,
        image: props.model.correctMovie.poster_path,
    };

    const numberOfGuesses = props.model.guesses.length;    


    return (
        <div className="winning-view">
            <h1>Game Over 😞</h1>
            <p >Sorry, you couldn't guess the correct movie.</p>

            <div className="movie-details">
                <h2>The correct answer was: {movie.name}</h2>
                <p className="movie-description">{movie.description}</p>
                <img src={`https://image.tmdb.org/t/p/w300${movie.image}`} alt={movie.name} />
            </div>
            <button onClick={props.onButtonClick}>Try Again</button>
        </div>
    );
});