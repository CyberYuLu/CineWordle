// SearchBar.jsx
import { observer } from "mobx-react-lite";
import { SearchBarView } from "../views/searchbarView";

/**
 * A named debounce function that returns a debounced version of a callback.
 * @param {Function} callback - The function to debounce.
 * @param {number} delay - The delay in milliseconds.
 * @returns {Function} - A debounced version of the callback.
 */
function debounce(callback, delay) {
  let timerId;
  function debounced(...args) {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, delay);
  }
  return debounced;
}

const SearchBar = observer(function SearchBar(props) {
  // When this function is called, it will execute the search.
  function performSearch(query) {
    // Assumes that doSearch is implemented in your model.
    
    props.model.doSearch(query );
   
  }
  
  // Create a debounced version of performSearch
  const debouncedSearch = debounce(performSearch, 200);
  
  // Callback for when the query changes.
  function handleQueryChange(event) {
    const newQuery = event.target.value;
    console.log(newQuery)
    props.model.setSearchQuery(newQuery);
    if (newQuery.length >= 2) {
      debouncedSearch(newQuery);

    }
  }
  
  // When a movie suggestion is selected, update the search input and set current guess.
  function handleSuggestionSelect(movie) {
    // Update the search bar with the movie title.
    props.model.setSearchQuery(movie.title);
    // Save the current guess (for example, storing the movie id).
    props.model.setCurrentGuess(movie.id);
  }
  
  // When the submit button is clicked, use the selected movie id.
  function clickButtonACB() {
    if (props.model.currentGuess) {
      console.log("Submitting movie id:", props.model.currentGuess);
      // You might want to call additional logic here (e.g., submit the guess)
    } else {
      console.log("No movie has been set.");
    }
  }
  
  let suggestions = props.model.searchResultsPromiseState.data?.results || [];
  let query = props.model.searchStr|| "";
  
  return (
    <SearchBarView
      query={query}
      suggestions={suggestions}
      onQueryChange={handleQueryChange}
      onSuggestionSelect={handleSuggestionSelect}
      onSubmitButtonClick={clickButtonACB}
    />
  );
});

export { SearchBar };
