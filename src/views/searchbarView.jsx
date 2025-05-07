// SearchBarView.jsx
import "/src/style.css";
import { SuspenseView } from "./suspenseView";
//export function SearchBarView({ query, suggestions, onQueryChange, onSuggestionSelect, onSubmitButtonClick }) {
  

export function SearchBarView({
  query,
  isLoading, 
  suggestions,
  onQueryChange,
  onSuggestionSelect,
  onSubmitButtonClick,
}) {
  return (
    <div className="searchBarContainer">
      <input
        type="text"
        placeholder="Enter movie guess"
        value={query}
        onChange={onQueryChange}
        className="searchBarInput"
      />
      <button
        onClick={onSubmitButtonClick}
        className="searchBarButton"
      >
        Submit
      </button>

      {query.length > 2 &&  (
        <div className="searchBarOptions">
           {isLoading ? (
            <SuspenseView />
          ) : (
          
          suggestions.map((movie) => {
            // Extract just the year from release_date
            const year = movie.release_date
              ? movie.release_date.substring(0, 4)
              : "";

            return (
              <div
                key={movie.id}
                onClick={() => onSuggestionSelect(movie)}
                className="searchBarOptionItem"
              >
                <div className="searchBarOptionText">
                  <span className="searchBarTitle">{movie.title}</span>
                  {year && (
                    <span className="searchBarReleaseYear">
                      ({year})
                    </span>
                  )}
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