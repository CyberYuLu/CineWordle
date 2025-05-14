import "/src/style.css";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";



export const MainGameView = observer((props) => {

  const targetTitle = props.model.correctMovie?.title || "No Data";
  const targetYear = props.model.correctMovie?.release_date.split("-")[0] || 0;
  const targetBudget = props.model.correctMovie?.budget.toLocaleString("fr-FR") || 0;
  const targetCompany = props.model.correctMovie?.production_companies[0]?.name || "No Data";
  const targetCountry = props.model.correctMovie?.production_countries[0]?.name || "No Data";
  const targetDirector = props.model.correctMovie?.directors[0] || "No Data";

  const genresTarget = props.targetMovie?.genres.map(g => ("" + g.name));

  function displayGuessCB (guess, isNewest)  
  {

    const rowClassName = `guess-header${isNewest ? " new-row" : ""}`; //the new row will have a different css class, basic class : "guess-header", new one : "new-row"


    const title = guess?.title || "No Data";
    const releaseYear = guess?.release_date.split("-")[0] || 0;
    const budget = guess?.budget.toLocaleString("fr-FR") || 0;
    const director = guess?.directors[0] || "No Data";
    const company = guess?.production_companies[0]?.name || "No Data";
    const country = guess?.production_countries[0]?.name || "No Data";

    const genres = guess?.genres.map(g => ("" + g.name));


    const nameCorrect = title === targetTitle;
    const yearCorrect = releaseYear === targetYear;

    const genresTarget = props.targetMovie.genres.map(g => ("" + g.name));
    const genreMatch = genres.some(g => genresTarget.includes(g));
    const genreCorrect = genres.length === genresTarget.length && genres.every((g) => genresTarget.includes(g));    

    const budgetCorrect = budget === targetBudget;
    const directorCorrect = director === targetDirector;
    const companyCorrect = company === targetCompany;
    const countryCorrect = country === targetCountry;

    const genreString = genres.join(", ");

    return (
      <tr key={title} className={rowClassName}>
        <td className="guess-cell_image">
          <img src={`https://image.tmdb.org/t/p/w300${guess.poster_path}`} alt={title} className="guess-image" />
        </td>
        <td className={`guess-cell ${nameCorrect ? "correct" : "incorrect"}`}>{title}</td>
        <td className={`guess-cell ${yearCorrect ? "correct" : "incorrect"}`}>
          <div >
            <span>{releaseYear}</span>
            {!yearCorrect && (
              <span>
                {releaseYear > targetYear ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="25" fill="black" viewBox="0 0 24 24">
                    <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="25" fill="black" viewBox="0 0 24 24">
                    <path d="M12 19V5m0 0l-6 6m6-6l6 6" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            )}
          </div>
        </td>
        <td className={`guess-cell ${genreCorrect ? "correct" : genreMatch ? "partial" : "incorrect"}`}>{genreString}</td>
        <td className={`guess-cell ${budgetCorrect ? "correct" : "incorrect"}`}>
          <div >
            <span>{budget.toLocaleString("fr-FR")}</span>
            {!budgetCorrect && (
              <span>
                {budget > targetBudget ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="25" fill="black" viewBox="0 0 24 24">
                    <path d="M12 5v14m0 0l-6-6m6 6l6-6" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="25" fill="black" viewBox="0 0 24 24">
                    <path d="M12 19V5m0 0l-6 6m6-6l6 6" stroke="black" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            )}
          </div>
        </td>
        <td className={`guess-cell ${directorCorrect ? "correct" : "incorrect"}`}>{director}</td>
        <td className={`guess-cell ${companyCorrect ? "correct" : "incorrect"}`}>{company}</td>
        <td className={`guess-cell ${countryCorrect ? "correct" : "incorrect"}`}>{country}</td>
      </tr>
    );
  };

  

  return (
    <div>



      <h1 style={{ textAlign: "center", padding: "20px" }}>Guesses</h1>
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
          {props.guesses && props.guesses.slice().reverse().map((guess, index) => displayGuessCB(guess, index === 0))}
        </tbody>
      </table>
    </div>
  );
})


