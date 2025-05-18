import React from "react";
import { observer } from "mobx-react-lite";
import "/src/style.css";

export const WinningView = observer((props) => {
    const movie = {
        name: props.model.correctMovie.title,
        description: props.model.correctMovie.overview,
        image: props.model.correctMovie.poster_path,
    };

    const numberOfGuesses = props.model.guesses.length;    

    return (
        <div className="winning-view">
            <h1>Congratulations! 🎉</h1>
            <p c>The correct movie was guessed in {numberOfGuesses} guesses!</p>

            <div className="movie-details">
                <h2>{movie.name}</h2>
                <p className="movie-description">  {movie.description.length > 300
                    ? movie.description.slice(0, 300) + "..."
                    : movie.description}</p>
                <img src={`https://image.tmdb.org/t/p/w300${movie.image}`} alt={movie.name} />
            </div>
            <button onClick={props.onButtonClick}>Exit !</button>
        </div>
    );
});
