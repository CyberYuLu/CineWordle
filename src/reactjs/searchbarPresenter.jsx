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
  const { model, setNotification, setIsCorrect } = props;
  // When this function is called, it will execute the search.
  function performSearch(query) {
    
    props.model.doSearch(query );
   
  }
  
  // Create a debounced version of performSearch
  const debouncedSearch = debounce(performSearch, 1000);
  
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
    if (model.currentGuess) {
      console.log("Submitting movie id:", model.currentGuess);
      getMovieDetails(model.currentGuess)
        .then(movieDetails => {
          console.log("Got details:", movieDetails);
          
          recordGuess(model.currentUser.uid, movieDetails);
          model.addGuessForUser(movieDetails); 
  
          const isCorrect = movieDetails.title === model.correctMovie.title;
          setIsCorrect(isCorrect);
          setNotification(isCorrect ? "Correct guess!" : `"${movieDetails.title}" has been added!`);
  
          setTimeout(() => setNotification(""), 3000);

          // Change to remove the text.
          model.setSearchQuery("");
          model.setCurrentGuess(null);
        })
        .catch(err => {
          console.error(err);
          setNotification("Failed to fetch movie details.");
          setIsCorrect(false);
        });
    } else {
      setNotification("No movie selected.");
      setIsCorrect(false);
    }
  }

  // Suspenseview.
  const isLoading = !props.model.searchResultsPromiseState.data;
  let suggestions = props.model.searchResultsPromiseState.data?.results || [];
  let query = props.model.searchStr|| "";
  

  /**
   * Possibly not the best solution. Need to adjust so so drop down results has their own presenter as in the lab.
   * 
   */
  return (
    <SearchBarView
      query={query}
      isLoading={isLoading}
      suggestions={suggestions}
      onQueryChange={handleQueryChange}
      onSuggestionSelect={handleSuggestionSelect}
      onSubmitButtonClick={clickButtonACB}
    />
  );
});

export { SearchBar };
