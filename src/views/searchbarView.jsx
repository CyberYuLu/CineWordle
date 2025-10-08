// src/views/searchbarView.jsx
import React from "react";
import { SuspenseView } from "./suspenseView";

export function SearchBarView({
  inputRef,
  showOptions,
  isSubmitting,
  query,
  isLoading,
  suggestions,
  selectedIndex,
  onQueryChange,
  onKeyDown,
  onSuggestionSelect,
  onSubmitButtonClick,
}) {
  return (
    <div className="searchBarContainer">
      <input
        ref={inputRef}
        type="text"
        placeholder="Enter movie guess"
        value={query}
        onChange={onQueryChange}
        onKeyDown={onKeyDown}
        className="searchBarInput"
        disabled={isSubmitting}
      />
      <button
        onClick={onSubmitButtonClick}
        className="searchBarButton"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>

      {showOptions && query.length >= 2 && (
        <div className="searchBarOptions">
          {isLoading ? (
            <SuspenseView />
          ) : (
            suggestions.map((movie, idx) => {
              const year = movie.release_date?.slice(0, 4) || "";
              const isActive = idx === selectedIndex;
              return (
                <div
                  key={movie.id}
                  onClick={() => onSuggestionSelect(movie)}
                  className={`searchBarOptionItem ${isActive ? "active" : ""}`}
                >
                  <div className="searchBarOptionText">
                    <span className="searchBarTitle">{movie.title}</span>
                    {year && <span className="searchBarReleaseYear">({year})</span>}
                  </div>
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                      alt={`${movie.title} poster`}
                      className="searchBarPosterThumb"
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
