import "/src/style.css";
import { observer } from "mobx-react-lite";



export const MainGameView = observer((props) => {

  function displayGuessCB (guess)  
  {
    const nameCorrect = guess.name === props.targetMovie.name;
    const yearCorrect = guess.year === props.targetMovie.year;
    const genreMatch = guess.genre.some(g => props.targetMovie.genre.includes(g));
    const genreCorrect = guess.genre.length === 1 && genreMatch;
    const prop1Correct = guess.prop1 === props.targetMovie.prop1;
    const prop2Correct = guess.prop2 === props.targetMovie.prop2;

    const genreString = guess.genre.join(", ");


    return (
      <tr key={guess.name} className="guess-header">
        <td className="guess-cell_image">
          <img src={guess.img} alt={guess.name}   className="guess-image" />
        </td>
        <td  className={`guess-cell ${nameCorrect ? "correct" : "incorrect"}`}>{guess.name}</td>
        <td className={`guess-cell ${yearCorrect ? "correct" : "incorrect"}`}>
          <div className="year-container">
            <span>{guess.year}</span>
            {!yearCorrect && (
              <span>
                {guess.year < props.targetMovie.year ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="25" fill="black" viewBox="0 0 24 24">
                    <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="25" fill="black" viewBox="0 0 24 24">
                    <path d="M12 19V5m0 0l-6 6m6-6l6 6" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
            )}
          </div>
        </td>
        <td className={`guess-cell ${genreCorrect ? "correct" : genreMatch ? "partial" : "incorrect"}`}>{genreString}</td>
        <td  className={`guess-cell ${prop1Correct ? "correct" : "incorrect"}`}>{guess.prop1}</td>
        <td  className={`guess-cell ${prop2Correct ? "correct" : "incorrect"}`}>{guess.prop2}</td>
      </tr>
    );
  };
  

  return (
    <div>



      <h1 >Guesses</h1>
      <table className="guesses-container">
        <tbody>
          <tr className="guess-header">
          <th  className="guess-cell_image">Image</th>
            <th  className="guess-cell">Name</th>
            <th  className="guess-cell">Year</th>
            <th  className="guess-cell">Genre</th>
            <th  className="guess-cell">Prop1</th>
            <th  className="guess-cell">Prop2</th>

          </tr>
          {props.guesses.map(displayGuessCB)}
        </tbody>
      </table>
    </div>
  );
})


