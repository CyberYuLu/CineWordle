
// Model for representing the app.
// Should probably have on model for everything. T
import { resolvePromise } from "./resolvePromise";
import {getExpectedMovieID, getMovieDetails, searchMovies} from "./fetchData"
import { makeAutoObservable, runInAction, set, reaction} from "mobx";
import { updateLeaderboard, updateUserStreak, updateDailyResult } from "./firebase";

export const model = {
    /**
     * The movie we are looking for. Should be an object with a ID and the 
     * attributes we are looking for to avoid having to make multiple API calls for the attributes. Get the attributes with an API call.
     */
    correctMovie: null,

   
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
    
    authInitialized: false,
    
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
        this.setStreak(this.streak + 1);
        this.displayWinningScreen = win;
        // 1) write the win flag into the users/<uid>/guesses/<today> doc
        updateDailyResult(this.currentUser.uid, { win: true, loose: false })
        .catch(console.error);
        console.log("Updating daily result with win", this.currentUser.uid)

        const entry = {
          uid: this.currentUser.uid,
          name: this.currentUser.email,
          score: this.guesses.length,
          timestamp: Date.now(),
        };

        console.log("Entry to leaderboard", entry)

        // Can get challengeID from the date.
        let challengeID = new Date().toISOString().split("T")[0]
        updateLeaderboard(challengeID, entry).catch(console.error);

      // also update local leaderboard if you’re showing it immediately
     //   this.addEntryToLeaderboard();
        
        // Update the local leaderboard
        this.leaderBoard.push(entry)
      }
      this.win = win;
      
    },
    setLoose(loose) {
      if(!this.loose)
      {
        //to avoid to display the winning screen twice.
        this.setStreak(0);
        this.displayLoosingScreen = loose;

        // Update with lose. 
        updateDailyResult(this.currentUser.uid, { win: false, loose: true })
        console.log("Updating daily result with log", this.currentUser.uid)

        .catch(console.error)
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

    // ------------------------- STREAK MANAGEMENT --------------------------
    streak: 0,

    setStreak(newStreak) {
    this.streak = newStreak;
    },

    // ------------------------- LEADERBOARD MANAGEMENT -------------------------

    addEntryToLeaderboard() {
      const entry = {
        uid: this.currentUser.uid,
        name: this.currentUser.email,
        score: this.guesses.length,
        timestamp: Date.now(),
      };
      this.leaderBoard.push(entry);

    },

    resetLeaderboard() {
      this.leaderBoard = [];
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
    },

    resetModel() {
        this.correctMovie = null;
        this.currentUser = null;
        this.leaderBoard = [];
        this.guesses = [];
        this.popular = true;
        this.authInitialized = false;
        this.currentGuessID = null;
        this.searchStr = null;
        this.searchResultsPromiseState = {
          data: { results: [] },
          error: null,
          promise: null,
        };
        this.currentMoviePromiseState = {};
        this.win = false;
        this.loose = false;
        this.displayLoosingScreen = false;
        this.displayWinningScreen = false;
        this.guessForFirstHint = 3; 
        this.guessForSecondHint = 5;
        this.guessForLoose = 7;
      }



      /**
       *  Some code for an experiment. 
       * 
       */

      




};

makeAutoObservable(model);


// -------------- WINNING MANAGEMENT + HINT MANAGEMENT -------------------------
// handle winning and loosing with side effects.
reaction(ifTooMuchGuessACB, triggerLooseACB);
reaction(isCorrectGuessACB, triggerWinACB);
reaction(ifFirstHintACB, triggerFirstHintACB);
reaction(ifSecondHintACB, triggerSecondHintACB);

function ifTooMuchGuessACB(){
    if (model && model.guesses && model.guesses.length >= model.guessForLoose) 
      {
        
        return true;}
};

function triggerLooseACB(){
    console.log("Too much guess, triggering loose")
    model.setLoose(true);
    
}

function isCorrectGuessACB() {
    if (model && model.guesses &&  model.guesses.length > 0) {
        const lastGuess = model.guesses[model.guesses.length - 1];
        return lastGuess.id === model.correctMovie.id;
    }
    return false;
}

function triggerWinACB() {
    console.log("Correct guess, triggering win")
    model.setWin(true);
    


}

function ifFirstHintACB(){
    if (model && model.guesses && model.guesses.length >= model.guessForFirstHint) 
        return true;
}

function triggerFirstHintACB()
{
    model.setFirstHint(true);
    console.log("First hint triggered")
}

function ifSecondHintACB(){
    if (model &&  model.guesses && model.guesses.length >= model.guessForSecondHint) 
        return true;
}

function triggerSecondHintACB()
{
    model.setSecondHint(true);
    console.log("Second hint triggered")
}

// ------------------ END OF WINNING MANAGEMENT + HINT MANAGEMENT -------------------------

//------------------ Handle solo play -------------------------


