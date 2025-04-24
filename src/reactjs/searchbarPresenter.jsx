// SearchBar.jsx
import { observer } from "mobx-react-lite";
import { SearchBarView } from "../views/searchbarView";
import { getMovieDetails } from "../fetchData";
import { recordGuess } from "../firebase";
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
  
  /**
   * When the user submits a guess will the persistence for the user be updated with the guess.
   * Might need to adjust the fetch to aviod race conditions. 
   */
  function clickButtonACB() {
    if (props.model.currentGuess) {
      console.log("Submitting movie id:", props.model.currentGuess);
      // getting the details about the movie
      getMovieDetails(props.model.currentGuess)
      .then(movieDetails =>{
        console.log("Got details:", movieDetails);
        // set the movie in persistance. 
        console.log("UID:", props.model.currentUser.uid);
        console.log("Email:", props.model.currentUser.email);
        recordGuess(props.model.currentUser.uid, movieDetails);

      });
      
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
