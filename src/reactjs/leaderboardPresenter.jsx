// src/reactjs/leaderboardPresenter.jsx
import { observer } from "mobx-react-lite";
import { SuspenseView } from "../views/suspenseView.jsx";
import { LeaderboardView } from "../views/leaderboardView.jsx";

export const LeaderboardPresenter = observer(function LeaderboardPresenter({ model }) {
  // show SuspenseView until the leaderboard has been loaded
  if (model.leaderBoard === null) {
    return <SuspenseView />;
  }
  // once loaded, render the real table
 const entries = Object.values(model.leaderBoard)
   // Fewer guesses → better rank
   .sort((a, b) => a.score - b.score);
  return <LeaderboardView entries={entries} />;
});