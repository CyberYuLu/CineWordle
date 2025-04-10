
import "/src/style.css"
import { SearchBar } from "../reactjs/searchbarPresenter";


export function MainView(props){


    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Movie Wordle</h1>
            <p>Guess the movie!</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "20px" }}>
                <button

                    className="buttonStyle"
                    onClick={() => console.log("Current Streak clicked")}
                    
                >
                    Current Streak
                </button>
                <button
                    onClick={() => console.log("User Data clicked")}
                    className="buttonStyle"
                >
                    User Data
                </button>
                <button
                    onClick={() => console.log("How to play clicked")}
                    className="buttonStyle"
                >
                    How to play
                </button>
            </div>
            <div>
            <SearchBar model={props.model} />

            </div>

        </div>
    );
};

