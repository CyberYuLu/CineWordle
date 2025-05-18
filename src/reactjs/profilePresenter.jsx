import { observer } from "mobx-react-lite";
import { ProfileView } from "../views/profileView.jsx";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const ProfilePresenter = observer(function ProfilePresenter({ model }) {
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [averageGuesses, setAverageGuesses] = useState(0);
  const [totalWins, setTotalWins] = useState(0);
  const [totalLosses, setTotalLosses] = useState(0);
  const [winRate, setWinRate] = useState(0);
  const [guessesPerWin, setGuessesPerWin] = useState(0);

  useEffect(() => {
    async function fetchGuessesData() {
      if (!model.currentUser) return;

      const guessesRef = collection(db, "users", model.currentUser.uid, "guesses");
      const snapshot = await getDocs(guessesRef);

      let totalGuessesCount = 0;
      let totalRounds = 0;
      let totalWinsCount = 0;
      let totalLossesCount = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();

        // 只统计有猜测的那天
        if (Array.isArray(data.guess) && data.guess.length > 0) {
          totalGuessesCount += data.guess.length;
          totalRounds += 1;

          if (data.win === true) totalWinsCount += 1;
          if (data.loose === true) totalLossesCount += 1;
        }
      });

      const avg = totalRounds > 0 ? (totalGuessesCount / totalRounds).toFixed(0) : 0;
      const winRateCalc = totalRounds > 0 ? ((totalWinsCount / totalRounds) * 100).toFixed(2) : 0;
      const guessesPerWinCalc = totalWinsCount > 0 ? (totalGuessesCount / totalWinsCount).toFixed(0) : 0;

      setTotalGuesses(totalGuessesCount);
      setAverageGuesses(avg);
      setTotalWins(totalWinsCount);
      setTotalLosses(totalLossesCount);
      setWinRate(winRateCalc);
      setGuessesPerWin(guessesPerWinCalc);
    }

    fetchGuessesData();
  }, [model.currentUser]);

  return (
    <ProfileView
      user={model.currentUser}
      totalGuesses={totalGuesses}
      averageGuesses={averageGuesses}
      totalWins={totalWins}
      totalLosses={totalLosses}
      winRate={winRate}
      guessesPerWin={guessesPerWin}
      streak={model.streak}
    />
  );
});

export { ProfilePresenter };
