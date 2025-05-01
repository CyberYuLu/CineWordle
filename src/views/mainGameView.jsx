import "/src/style.css";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";



export const MainGameView = observer((props) => {

  function displayGuessCB (guess)  
  {
    const nameCorrect = guess.title === props.targetMovie.title;
    const yearCorrect = guess.release_date.split("-")[0] === props.targetMovie.release_date.split("-")[0];
    console.log(guess.genres);


    const genres = guess.genres.map(g => ("" + g.name));
    console.log(props.targetMovie.genres)
    //const genresTarget = props.targetMovie.genres.map(g => ("" + g.name));
    //set hardcoded values for the genres.
    const genresTarget = ["Action", "Fantasy"];

    const genreMatch = genres.some(g => genresTarget.includes(g));

    const genreCorrect = genres.length === genresTarget.length && genres.every((g) => genresTarget.includes(g));    

    const budgetCorrect = guess.budget === props.targetMovie.budget;
    const directorCorrect = guess.directors[0] === props.targetMovie.directors[0];

    const companyCorrect = guess.production_companies[0].name === props.targetMovie.production_companies[0].name;
    const countryCorrect = guess.production_countries[0].name === props.targetMovie.production_countries[0].name;


    const genreString = genres.join(", ");


    return (
      <tr key={guess.title} className="guess-header">
        <td className="guess-cell_image">
          <img src={`https://image.tmdb.org/t/p/w300${guess.poster_path}`} alt={guess.title}   className="guess-image" />
        </td>
        <td  className={`guess-cell ${nameCorrect ? "correct" : "incorrect"}`}>{guess.title}</td>
        <td className={`guess-cell ${yearCorrect ? "correct" : "incorrect"}`}>
          <div className="numerical-container">
            <span>{guess.release_date.split("-")[0]}</span>
            {!yearCorrect && (
              <span>
                {guess.release_date.split("-")[0] > props.targetMovie.release_date.split("-")[0]? (
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
        <td className={`guess-cell ${genreCorrect? "correct" : genreMatch ? "partial" : "incorrect"}`}>{genreString}</td>
        <td className={`guess-cell ${budgetCorrect ? "correct" : "incorrect"}`}>
          <div className="numerical-container">
            <span>{guess.budget.toLocaleString("fr-FR")}</span>
            {!yearCorrect && (
              <span>
                {guess.budget > props.targetMovie.budget? (
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

        <td  className={`guess-cell ${directorCorrect ? "correct" : "incorrect"}`}>{guess.directors[0]}</td>
        <td  className={`guess-cell ${companyCorrect ? "correct" : "incorrect"}`}>{guess.production_companies[0]?.name}</td>
        <td  className={`guess-cell ${countryCorrect ? "correct" : "incorrect"}`}>{guess.production_countries[0]?.name}</td>

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
            <th  className="guess-cell">Budget</th>
            <th  className="guess-cell">Director</th>
            <th  className="guess-cell">Company</th>
            <th  className="guess-cell">Country</th>
          </tr>
          {props.guesses.slice().reverse().map(displayGuessCB)}
        </tbody>
      </table>
    </div>
  );
})


