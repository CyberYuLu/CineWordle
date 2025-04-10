// SearchBarView.jsx
import React from "react";

export function SearchBarView({ query, suggestions, onQueryChange, onSuggestionSelect, onSubmitButtonClick }) {
  
  // Local named callback for the submit button.
  function handleSubmitABC() {
    onSubmitButtonClick();
  }
  
  return (
    <div style={{ position: "relative" }}>
      <input
        type="text"
        placeholder="Enter movie guess"
        value={query}
        onChange={onQueryChange}
      />
      
      {query.length > 2 && suggestions.length > 0 && (
        <div className="options" >
          {suggestions.map((movie) => (
            <div
              key={movie.id}
              onClick={() => onSuggestionSelect(movie)}
              style={{ padding: "8px", cursor: "pointer" }}
            >
              {movie.title}
            </div>
          ))}
        </div>
      )}
      <button onClick={handleSubmitABC}>Submit</button>
    </div>
  );
}
