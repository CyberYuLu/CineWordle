
// Model for representing the app.
// Should probably have on model for everything. T
import { resolvePromise } from "./resolvePromise";
import {getExpectedMovieID, getMovieDetails, searchMovies, fetchGenreMap} from "./fetchData"
import { makeAutoObservable, runInAction, set} from "mobx";

export const model = {
    /**
     * The movie we are looking for. Should be an object with a ID and the 
     * attributes we are looking for to avoid having to make multiple API calls for the attributes. Get the attributes with an API call.
     */
    correctMovie: null,

    // set the genremap to null and then populate it later.
    genreMap: null,
  
    /**
     * Store the currently authenticated user. All the information 
     */
    currentUser : null, 
    leaderBoard :  [],  // The values can be collected from firebase intially and when something changes.
    /**
     * Keep the guesses locally, but pick them up from the persistence. 
     * 
     */
    guesses: [], 

    // Had to change to this since the guesses aboved interfered. 
    guess: [], 

    // Parameters for filtering which movies we can select from..
    popular: true,
    

    
    // currentGuess is the id.
    currentGuessID: null, 
    // Slightly different from the labs as we only have a string.
    searchStr :  null, 
    searchResultsPromiseState: {
      data: { results: [] },
      error: null,
      promise: null,
    },
    currentMoviePromiseState: {},

  // ------------------------- WINNING MANAGEMENT + HINT MANAGEMENT -------------------------
    //for win, loose management. 
    win : false,
    loose : false,
    displayLoosingScreen : false,
    displayWinningScreen : false,

    guessForFirstHint : 3, 
    guessForSecondHint : 5,
    guessForLoose : 7,

    setDisplayWinningScreen(display) {
      this.displayWinningScreen = display;
    },
    setWin(win) {
      if(!this.win)
      {
        //to avoid to display the winning screen twice.
        this.displayWinningScreen = win;
      }
      this.win = win;
      
    },
    setLoose(loose) {
      if(!this.loose)
      {
        //to avoid to display the winning screen twice.
        this.displayLoosingScreen = loose;
      }
      this.loose = loose;
    },

    setDisplayLoosingScreen(display) {
      this.displayLoosingScreen = display;
    },

    firstHint: false,
    secondHint: false,
    setFirstHint(display) {
      this.firstHint = display;
    },
    setSecondHint(display) { 
      this.secondHint = display;
    },

    // ------------------------- MOVIE MANAGEMENT -------------------------

   

    // sets the expected movie
    setExpectedMovie(movie){
        this.expectedMovie = movie;

    }, 

    // Add a new user based on firebase data.
    setCurrentUser(user) {
      this.currentUser = user;
    },

    // Set the current guess. It is for the global state so might not be necessary.s
    setCurrentGuess(movieID){
        this.currentGuess = movieID
    }, 

    // This function for recording guesses for an user. 
    addGuessForUser(guess) {
           // Each guess could be an object containing the guess details.
        this.guesses.push(guess);
    },

    // Method to reset the guesses when necessary.
    resetGuesses() {
      this.guesses = [];
    },

    /**
     * Function for setting the correct movie.
     * Need to adjust the API to return the ID.
     */
    setCorrectMovie(){
      this.correctMovie = getExpectedMovieID(this.minBudget, this.popular)
    }, 
     
    /**
     *  This is for evaluting the guess against the expected movie. 
     *  Can maybe make it into a help function later.
     *  Need to 
     */
    evaluateGuess(guess) {
        if (!this.expectedMovie) {
          throw new Error('Expected movie is not set');
        }
        // 
        return {
            titleMatch: guess.title.toLowerCase() === this.expectedMovie.title.toLowerCase(),
            directorMatch: guess.director.toLowerCase() === this.expectedMovie.director.toLowerCase(),
            releaseYearMatch: guess.releaseYear === this.expectedMovie.releaseYear,
          };
    },




    // Not sure about if it should be the same as in the labs, but here do we set the search parameter.
    setSearchQuery(query) {
        this.searchStr = query;
      },

    // Trigger a movie search.
    doSearch(obj){
        resolvePromise(searchMovies(obj), this.searchResultsPromiseState)
    }, 


    // Fetch the details for the current guess. This should be here and uses an API-call.
    //
    currentMovieEffect() {
        if (this.currentGuessID) {
          resolvePromise(getMovieDetails(this.currentGuessID), this.currentMoviePromiseState);
        }
      },

    getYear(dateString) {
        return dateString ? `(${new Date(dateString).getFullYear()})` : '';
    }



      /**
       *  Some code for an experiment. 
       * 
       */


};

// make the plain object observable
// Will need to adjust the state management. 
makeAutoObservable(model);

// —— One‐time initialization: load genres on startup ——
fetchGenreMap().then(map => {
  runInAction(() => {
    model.genreMap = map;
  });
});
