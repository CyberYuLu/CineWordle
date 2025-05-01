import { observer } from "mobx-react-lite";
import { useState } from "react";
import { NoDisplayHintView, HintView } from "/src/views/hintsView.jsx";

const HintsPresenter = observer(function HintsPresenter(props) {
    const guesses = props.model.guesses.length;

    //const [guesses, setGuesses] = useState(props.model.guesses.length);


    // Determine which hints to display based on the number of guesses
    const showFirstHint = guesses >= 5; // Display first hint after 3 guesses
    const showSecondHint = guesses >= 7; // Display second hint after 5 guesses
    console.log(props.model.correctMovie)
    const hints = {
        summary: props.model.correctMovie.overview || "No summary available.",
        mainCharacter: props.model.correctMovie.characters[0].character
    };


    return (
        <div>
            <div className="hints-container">
                {!showFirstHint && <NoDisplayHintView />}
                {showFirstHint && !showSecondHint && <HintView hint={<span><strong>Hint 1</strong>: Main Character - <strong>{hints.mainCharacter}</strong></span>} />}
                {showSecondHint && (
                    <div>
                        <HintView hint={<span><strong>Hint 1</strong>: Main Character - {hints.mainCharacter}</span>} />
                        <HintView hint={<span><strong>Hint 2</strong>: {hints.summary}</span>} />
                    </div>
                )}
            </div>
        </div>
    );
});

export { HintsPresenter };