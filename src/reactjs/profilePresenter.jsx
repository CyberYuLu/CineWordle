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

        // calculate the total guesses
        if (Array.isArray(data.guess) && data.guess.length > 0) {
          totalGuessesCount += data.guess.length;
          totalRounds += 1;
        }

        // calculate the total wins & total losses    
        if (data.win === true) {
          totalWinsCount += 1;
        }
        if (data.loose === true) {
          totalLossesCount += 1;
        }
      });

      // Calculate average guesses
      const avg = totalRounds > 0 ? (totalGuessesCount / totalRounds).toFixed(0) : 0;

      // Calculate win rate
      const winRate = totalRounds > 0 ? ((totalWinsCount / totalRounds) * 100).toFixed(2) : 0;


      // Calculate guesses per win
      const guessesPerWin = totalWinsCount > 0 ? (totalGuessesCount / totalWinsCount).toFixed(0) : 0;


      console.log("👀 winRate:", winRate);
      console.log("✅ totalWinsCount:", totalWinsCount);
      console.log("✅ totalRounds:", totalRounds);

      setTotalGuesses(totalGuessesCount);
      setTotalWins(totalWinsCount);
      setTotalLosses(totalLossesCount);
      setAverageGuesses(avg);
      setWinRate(winRate);
      setGuessesPerWin(guessesPerWin);

    }

    fetchGuessesData();
  }, [model.currentUser]);


  return (
    <ProfileView
      user={model.currentUser}
      totalGuesses={totalGuesses}
      averageGuesses={averageGuesses}
      streak={model.streak}
      totalWins={totalWins}
      totalLosses={totalLosses}
      winRate={winRate}
      guessesPerWin={guessesPerWin}
    />
  );
});

export { ProfilePresenter };