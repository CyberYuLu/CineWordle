import { observer } from "mobx-react-lite";
import { BlurredGameView } from "../views/blurredGameView.jsx";


export const BlurredGame = observer(function BlurredGamePresenter({
  model,
  maxAttempts = 8,
  mode = "radial",
}) {
  // how many wrong guesses so far
  const wrongCount = model.guesses.length;
  const clamped   = Math.min(wrongCount, maxAttempts);
  // normalized ratio [0..1]
  const ratio     = clamped / maxAttempts;

  // build full poster URL
  const posterSrc = model.correctMovie?.poster_path
    ? `https://image.tmdb.org/t/p/w500${model.correctMovie.poster_path}`
    : "";

  // called when user picks/submits a guess
  const handleGuess = (details) => {
    if (details.id === model.correctMovie.id) {
      model.setWin(true);
    } else {
      model.addGuessForUser(details);
    }
  };

  return (
    <BlurredGameView
      posterSrc={posterSrc}
      ratio={ratio}
      mode={mode}
      model={model}
      onGuess={handleGuess}
    />
  );
});
