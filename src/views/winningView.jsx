import React from "react";
import "/src/style.css";




export function WinningView(props) {

    const movie = {
        title: "The Count of Monte Cristo",
        description: "A thrilling tale of revenge and redemption.",
        image: "img/poster1.jpg"
    };

    const numberOfGuesses = 5; // This should be passed as a prop or calculated based on the game state

  

    return (
        <div className="winning-view">
            <h1>Congratulations! 🎉</h1>
            <p>You have won in {numberOfGuesses} guesses!</p>
            <div className="movie-details">
                <h2>{movie.title}</h2>
                <p>{movie.description}</p>
                <img src={movie.image} alt={movie.title} />
            </div>
            <button onClick={props.onButtonClick}>Exit !</button>

        </div>
        );
}

