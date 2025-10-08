import { observer } from "mobx-react-lite";
import { useState } from "react";
import { NoDisplayHintView, HintView } from "/src/views/hintsView.jsx";

const HintsPresenter = observer(function HintsPresenter(props) {

    const hints = {
        summary: props.model.correctMovie.overview || "No summary available.",
        mainCharacter: props.model.correctMovie.characters[0].character
    };


    return (
        <div>
            <div className="hints-container">
                {props.model.guesses.length < props.model.guessForFirstHint && <NoDisplayHintView />}
                {props.model.guesses.length >= props.model.guessForFirstHint && props.model.guesses.length < props.model.guessForSecondHint 
                 && <HintView hint={<span><strong>Hint 1</strong>: Main Character - <strong>{hints.mainCharacter}</strong></span>} />}
                {props.model.guesses.length >= props.model.guessForSecondHint && (
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