import { observer } from "mobx-react-lite";
import { LeaderboardView } from "../views/leaderboardView.jsx";

const LeaderboardPresenter = observer(function LeaderboardPresenter({ model }) {
    return <LeaderboardView leaderBoard={model.leaderBoard} />;
    
});

export { LeaderboardPresenter };
