import { observer } from "mobx-react-lite";
import { useState } from "react";
import { NoDisplayHintView, HintView } from "/src/views/hintsView.jsx";

const HintsPresenter = observer(function HintsPresenter(props) {
    const guesses = props.model.guesses.length;

    //const [guesses, setGuesses] = useState(props.model.guesses.length);


    // Determine which hints to display based on the number of guesses
    const showFirstHint = guesses >= 5; // Display first hint after 3 guesses
    const showSecondHint = guesses >= 7; // Display second hint after 5 guesses

    const hints = {
        summary: props.model.correctMovie.summary,
        mainCharacter: props.model.correctMovie.mainCharacter
    };


    return (
        <div>
            <div className="hints-container">
                {!showFirstHint && <NoDisplayHintView />}
                {showFirstHint && !showSecondHint && <HintView hint={`Hint 1: ${hints.summary}`} />}
                {showSecondHint && (
                    <div>
                        <HintView hint={`Hint 1: ${hints.summary}`} />
                        <HintView hint={`Hint 2: Main Character - ${hints.mainCharacter}`} />
                    </div>
                )}
            </div>
        </div>
    );
});

export { HintsPresenter };