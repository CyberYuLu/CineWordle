
// Model for representing the app.
// Should probably have on model for everything. T
import { resolvePromise } from "./resolvePromise";
import {getExpectedMovieID, getMovieDetails, searchMovies} from "./fetchData"

export const model = {
    /**
     * The movie we are looking for. Should be an object with a ID and the 
     * attributes we are looking for to avoid having to make multiple API calls for the attributes. Get the attributes with an API call.
     */
    correctMovie: null,
    /**
     * The users are in a list. Contains object with attributes such as an unique id and an username
     * It should also contain a list with unique ID:d which represent the guesses.
     * Should maybe have timestamps connected to guesses or something.
     */
    users: [],

    // Parameters for filtering which movies we can select from. Minbudget is obvious.
    popular: true,
    minBudget: 100000, 

    
    // currentGuess is the id.
    currentGuessID: null, 
    // Slightly different from the labs as we only have a string.
    searchStr :  null, 
    searchResultsPromiseState: {},
    currentMoviePromiseState: {},
    leaderBoard: [],      // Add this here, but not sure if necessary.

    // sets the expected movie
    setExpectedMovie(movie){
        this.expectedMovie = movie;

    }, 

    // Add a new user based on firebase data.
    addUser(user){
        this.users = [...this.users,user];
    },

    // Remove user based on uid.
    removeUser(userToRemove) {
        this.users = this.users.filter(user => user.uid !== userToRemove.uid);
      }, 
    

    // Set the current guess. It is for the global state so might not be necessary.s
    setCurrentGuess(movieID){
        this.currentGuess = movieID
    }, 

    // This function for recording guesses for an user. 
    addGuessForUser(uid, movie) {
        const user = this.users.find(u => u.uid === uid);
        if (user) {
          user.guesses = [...(user.guesses || []), movie];
        }
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


    /**
     * I guess we can assume the leaderboard is part of the model. Add some methods here then.
     * 
     */

    // model for keeping the leaderboard sorted.

    // need to add a function for calculting the value we base the leaderboard on.
};


/**
 * Inpiration for how we could get the attributes which are relevant from firebase 
 * 
 */
import { getAuth, onAuthStateChanged } from "firebase/auth";


const auth = getAuth();
// Ahh, we set an observer on the auth object. This listener should probably be in the root.
onAuthStateChanged(auth, (user) => {
    if(user){
        // uses the user.uid attribute as an unique attribute. 
        // will add other attributes as needed. Can probably add an attribute 
        // such as username which we would use in the leaderboard.

        // if the user does not already exist in the model. Will need to rename these. 
        if(!model.users.some(u => u.uid === user.uid)){
            model.addUser({
                uid: user.uid, 
                name: user.displayName ||user.email, 
                email: user.email, 
                score: 0,   // To be used in the leaderboard.
                guesses: []  // Debatable if it should be an attritbute.
            });
        }
    } else {
        // Hanlde user sign-out.
    }
});