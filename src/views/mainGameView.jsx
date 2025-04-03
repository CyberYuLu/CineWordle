import "/src/style.css";

export function MainGameView(props) {

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
        <td  className={`guess-cell ${yearCorrect ? "correct" : "incorrect"}`}>{guess.year}</td>
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
}
