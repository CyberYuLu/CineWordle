import { observer } from "mobx-react-lite";
import { ProfileView } from "../views/profileView.jsx";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase"; 

const ProfilePresenter = observer(function ProfilePresenter({ model }) {
  const [totalGuesses, setTotalGuesses] = useState(0);
  const [averageGuesses, setAverageGuesses] = useState(0);

  useEffect(() => {
    async function fetchGuessesData() {
      if (!model.currentUser) return;

      const guessesRef = collection(db, "users", model.currentUser.uid, "guesses");
      const snapshot = await getDocs(guessesRef);

      let totalGuessesCount = 0;
      let totalRounds = 0;

      snapshot.forEach((doc) => {
        const data = doc.data();
        if (Array.isArray(data.guess)) {
          totalGuessesCount += data.guess.length;
          totalRounds += 1;
        }
      });

      const avg = totalRounds > 0 ? (totalGuessesCount / totalRounds).toFixed(0) : 0;

      setTotalGuesses(totalGuessesCount);
      setAverageGuesses(avg);
    }

    fetchGuessesData();
  }, [model.currentUser]);

  return (
    <ProfileView
      user={model.currentUser}
      totalGuesses={totalGuesses}
      averageGuesses={averageGuesses}
      streak={model.streak}
    />
  );
});

export { ProfilePresenter };
