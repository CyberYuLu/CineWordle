import { resolvePromise } from "./resolvePromise";
import {getExpectedMovieID, getMovieDetails, searchMovies} from "./fetchData"

// Model for storing user-specific data; data that is unique for each logged-in user.
export const userModel = {
	currentUser: null,
	guesses: [],
	currentGuessID: null,

	setCurrentUser(user) {
		this.currentUser = user;
	},

	resetCurrentUser() {
		this.currentUser = null;
	},

	addGuess(guess) {
		this.guesses.push(guess);
	},

	resetGuesses() {
		this.guesses = [];
	},

	setCurrentGuess(movieID) {
		this.currentGuessID = movieID;
	},


};

// "Global" data is stored here.
export const appModel = {

	correctMovie: null,
	leaderBoard: [],
	popular: true,
	minBudget: 100000,
	searchStr: null,
	searchResultsPromiseState: {
		data: { results: [] },
		error: null,
		promise: null,
	},
	currentMoviePromiseState: {},

	setCorrectMovie(movie ) {
		this.correctMovie = movie;
	},

	evaluateGuess(guess) {
		if (!this.correctMovie) {
			throw new Error("Correct movie is not set!");
		}
		return {
			titleMatch: guess.title.toLowerCase() === this.correctMovie.title.toLowerCase(),
			directorMatch: guess.director.toLowerCase() === this.correctMovie.director.toLowerCase(),
			releaseYearMatch: guess.releaseYear === this.correctMovie.releaseYear,
			genreMatch: guess.genres.some(g => correctMovie.genres.includes(g)), // added genre and country
			countryMatch: guess.country.toLowerCase() === this.correctMovie.country.toLowerCase(),
		}
	},

	setSearchQuery(query) {
		this.searchStr = query;
	},

	doSearch(obj) {
		resolvePromise(searchMovies(obj), this.searchResultsPromiseState);
	},

	currentMovieEffect(currentGuessID) {
		if (currentGuessID) {
			resolvePromise(getMovieDetails(currentGuessID), this.currentMoviePromiseState);
		}
	}
}




