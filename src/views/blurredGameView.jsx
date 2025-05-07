import React from "react";
import { BlurredSearchbar } from "../reactjs/blurredSearchBarPrerenter";
import "./blurredGame.css";


export function BlurredGameView({ posterSrc, ratio, mode, model, onGuess }) {
  const maxBlur = 40; // px

  return (
    <div className="blurred-game-container">
      <div className="poster-wrapper">
        {mode === "blur-level" ? (
          // Single-layer, decreasing blur
          <img
            src={posterSrc}
            alt="Movie Poster"
            className="poster-img"
            style={{ filter: `blur(${maxBlur * (1 - ratio)}px)` }}
          />
        ) : (
          // Two-layer radial spotlight
          <>
            <img
              src={posterSrc}
              alt="Movie Poster (blurred)"
              className="poster-img blurred"
            />
            <img
              src={posterSrc}
              alt="Movie Poster (spotlight)"
              className="poster-img"
              style={{ clipPath: `circle(${ratio * 50}% at 50% 50%)` }}
            />
          </>
        )}
      </div>

      <div className="search-bar-section">
        <BlurredSearchbar
          model={model}
          posterSrc={posterSrc}
          onGuess={onGuess}
        />
      </div>

      {model.win && <p className="win-text">🎉 You guessed it!</p>}
    </div>
  );
}
