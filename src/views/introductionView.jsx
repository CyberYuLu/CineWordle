

export function IntroductionView({ onNavigateToMainMenu }) {
    return (
        <div className="introduction-container">
            <h1>Welcome to Movie Wordle!</h1>
            <p>
                Movie Wordle is an interactive game where you guess the movie of the day based on hints and clues. 
                Compete with friends, climb the leaderboard, and test your movie knowledge!
            </p>
            <p>
                Explore features like:
                <ul>
                    <li>Daily movie challenges</li>
                    <li>Hints to guide your guesses</li>
                    <li>Leaderboards to track your progress</li>
                </ul>
            </p>
            <p>Good luck and have fun!</p>

            {/* Button to navigate to the main menu */}
            <button onClick={onNavigateToMainMenu} className="buttonStyle">
                Go to Main Menu
            </button>

            {/* Frame for the TutorialView */}
            <div className="tutorial-frame">
                <h2>How to Play</h2>
                
            </div>
        </div>
    );
}