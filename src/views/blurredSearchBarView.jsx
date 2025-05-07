import "/src/style.css";

export function BlurredSearchbarView({ posterSrc, query, suggestions, onQueryChange, onSuggestionSelect, onSubmitButtonClick }) {
  return (
    <div
      className="searchBarContainer"
    >
      <div className="blurred-searchbar-overlay" />

      <input
        type="text"
        className="bsearchBarInput"
        placeholder="Enter movie guess"
        value={query}
        onChange={onQueryChange}
      />

      <button
        className="searchBarButton"
        onClick={onSubmitButtonClick}
      >
        Submit
      </button>

      {query.length > 2 && suggestions.length > 0 && (
        <div className="searchBarOptions">
          {suggestions.map((movie) => {
            const year = movie.release_date?.substring(0, 4) || "";
            return (
              <div
                key={movie.id}
                className="searchBarOptionItem"
                onClick={() => onSuggestionSelect(movie)}
              >
                <span className="searchBarTitle">{movie.title}</span>
                {year && <span className="searchBarReleaseYear">({year})</span>}
                {movie.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                    alt={`${movie.title} poster`}
                    className="searchBarPosterThumb"
                  />
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}