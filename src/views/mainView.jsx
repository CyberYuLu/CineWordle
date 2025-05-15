
import "/src/style.css"
import '../styles/general.css';

import TutorialView from "./tutorialView";
import StreakView from "./streakView";


export function MainView(props) {


    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Movie Wordle</h1>
            <h5>Guess the movie of the day!</h5>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px"  }}>
                <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#streakModal"

                >
                    Current Streak
                </button>
                
                
                <button
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#howToPlayModal"
                >
                    How to play
                </button>
            </div>

            <TutorialView />
            <StreakView  model  = {props.model}/>
        </div>
    );
};

