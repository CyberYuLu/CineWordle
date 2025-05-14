
import { observer } from "mobx-react-lite";
import { IntroductionView } from "../views/introductionView";

import { useNavigate } from "react-router-dom";

export const Introduction = observer(function IntroductionPresenter() {
    const navigate = useNavigate();


    function clickButtonACB() {
        navigate("/game");
  }

    return (
        <div>
        <IntroductionView
            onNavigateToMainMenu={clickButtonACB}
        />
        </div>
    );
});