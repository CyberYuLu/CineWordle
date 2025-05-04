import { observer } from "mobx-react-lite";
import { useState } from "react";
import { MainGameView } from "/src/views/mainGameView.jsx";
import { HintsPresenter } from "./hintsPresenter.jsx";
import { NotificationView } from "/src/views/notificationView.jsx";
import { SuspenseView } from "/src/views/suspenseView.jsx";
import { SearchBar } from "../reactjs/searchbarPresenter";
const MainGame = observer(
    function GameRender(props) {
 

        // state for notification message
        const [notification, setNotification] = useState(""); // display notification message
        const [isCorrect, setIsCorrect] = useState(null); // to track if the guess is correct




        return (
            <div>

                <div>
                {!(props.model.win || props.model.loose) && < SearchBar
                    model={props.model}
                    setNotification={setNotification}
                    setIsCorrect={setIsCorrect}
                />
                || props.model.win && <h1 style={{ textAlign: "center" }}>You won !</h1>
                || props.model.loose && <h1 style={{ textAlign: "center" }}>You lost !</h1>
                }
                </div>
                <NotificationView notification={notification} isCorrect={isCorrect} />
                {props.model.correctMovie && <HintsPresenter model={props.model} /> || <SuspenseView />}
                

                <MainGameView 
                    targetMovie={props.model.correctMovie} 
                    guesses={props.model.guesses} 
                    model={props.model}
                />
            </div>
        ); //
    }
);

export { MainGame };
