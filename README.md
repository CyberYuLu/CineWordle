# CineWordle

### Short description of our project

Our project is a wordle-style game where the user guesses a movie. This concept was made famous with the NYT Wordle game, where you get 6 guesses to guess a 5-letter word. To help you guess better, in the classic Wordle, the game lets you know if a letter you guessed is either a) not in the word, b) in the word but in the wrong position, or c) in the word and in the right position.

In our game, since we do not have "right positions", you're instead given hints in the form of metadata about the movie you guessed, making it possible to get "partial" correct answers.

Let's say that the correct movie of the day is **Titanic** by James Cameron, released in 1997. If your guess is the movie **Avatar** you would get the hints that the director is correct, and that the year is supposed to be older! (We have yet to decide exact details for what information to include in the hints, but we think that year and director are solid hints).

### What we have done

We have implemented authentication (login and signup), some basic API calls to fetch data about movies (works currently only in the console), an autocomplete feature for the guess-searchbar (helps you remember/come up with movie names), some basic layouts for the game (but not working game logic yet).

### What we plan to do

Our main priority is making the game logic work. Thereafter we plan to add a leaderboard feature, and make the UI look much nicer with a third party UI library. We also want to hook up the user authentication with the game logic so that we can store user results for the leaderboard.

### Project file structure

We have followed the Tutorial Week file structure in our project. Basically all code is in the /src folder, which contains the folders of interest /reactjs and /views, and the files Model.js (which contains the model and related functions), resolvePromise.js (which does basically the same thing as in TW), fetchData.js (which contains code to do API calls to the IMDB movie API), and firebase.js (which contains the firebase configuration). The /reactjs folder contains our ReactRoot.jsx and our presenters, where we initialize the reactive model object, pass it to the presenters, and in the presenters we handle incoming user interaction from the views. The /views folder contains our different user interface views, which we have separated for authentication, sidebar, home screen, winning screen, etc. Each view has a corresponding presenter in the /reactjs folder.