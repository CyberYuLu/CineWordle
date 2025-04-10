/**
 * Functions for fetching the data we need from the API.
 * 
 * Start by getting the basics to work, then can we modiy the data with 
 */



/**
 * First function to make sure the API works as expected. It can also be used to get all possible movies to chose from.
 * The possible movies to choose from might need to be filtered as well to avoid to obscure movies.
 * 
 * There is no way to directly get a random movie. The two options are to get 500 pages of movies (500 * 20 = 10000 movies in total) based on some search criteria 
 * to avoid obscure movies. The other would be to get the maximum id with the latest endpoint and then use and id between 1 
 * and that max id,we also have to take into account that some id:s do not exist and handled 404s and go to the nex guess.
 * But if we use that approach can we not filter so would need to genereate one, select those that do not generate 404s and then apply filtering 
 * and if the filtering do not match, do it all again.
 * 
 * This code uses the first approach. The criteria are minium budget and sorting by popular.
 */
export function getExpectedMovieID({minBudget, popular}){  
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmM4Y2ZlNmIxMWIyMzVlMzRiMjk1YjU2YmJmZGRmOCIsIm5iZiI6MTc0MzE2NTA3Ni4xNzkwMDAxLCJzdWIiOiI2N2U2OTY5NDE0YmJhNmFlMzEwMDJmMGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VEYRiCzXDO6rLqMKpPCQF8X1TIsaO8k5MdVqf6IyT1A'
        }
    };
    
    let baseUrl = `https://api.themoviedb.org/3/discover/movie?`;
    // Apply filters based on the criteria provided
     const params = [];
    if (minBudget) {
        params.push(`with_budget.gte=${minBudget}`);
    }
    if (popular) {
        params.push(`sort_by=popularity.desc`);
    } 
    baseUrl += params.join('&');


    fetch(baseUrl, options)
        .then(response => response.json())   // 
        .then(data => {
            let totalPages = data.total_pages; 
            totalPages = Math.min(500, totalPages) // at most 500.

            if(totalPages === 0){
                console.log("No movies found with the given criteria.");
                return
            }
            // Generate random page number
            const randomPage = Math.floor(Math.random() * totalPages) + 1;
            
            // Fetch the specific random page.
            const pageUrl = `${baseUrl}&page=${randomPage}`;
            return fetch(pageUrl, options);
            
        } ).
        then(response => response && response.json()).
        // Get a random movie on the page and some error handling. Return if works correctly.
        then(data => {
            if (!data || !data.results || data.results.length === 0) {
                console.log("No movies found on the random page.");
                return;
              }
            
              const randomIndex = Math.floor(Math.random() * data.results.length);
              const randomMovie = data.results[randomIndex]
              console.log("Random Movie:", randomMovie);

        }).

        catch(err => console.error(err));
    
}

/**
 *  Function for returning the movies matching a string, starting from two or three  letters. 
 * !!! Might need to to add some method to ease the demand on the API, can be done with a timer. !!!!
 *  
 *  These results should probably be sorted based on
 */
export function searchMovies(query){
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmM4Y2ZlNmIxMWIyMzVlMzRiMjk1YjU2YmJmZGRmOCIsIm5iZiI6MTc0MzE2NTA3Ni4xNzkwMDAxLCJzdWIiOiI2N2U2OTY5NDE0YmJhNmFlMzEwMDJmMGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VEYRiCzXDO6rLqMKpPCQF8X1TIsaO8k5MdVqf6IyT1A'
        }   
    };
  
    const url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}`;
  // **Return** the fetch promise.
  return fetch(url, options)
    .then(res => res.json())
    .catch(err => {
      console.error(err);
      throw err;
    });
}


// Function for getting even more details about a movie based in its IMDB id. 
// It is the movie end-point with the id appended to the end. Can also use Find by ID
// We will need to filter out the specific details we want. 
export function getMovieDetails(id){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmM4Y2ZlNmIxMWIyMzVlMzRiMjk1YjU2YmJmZGRmOCIsIm5iZiI6MTc0MzE2NTA3Ni4xNzkwMDAxLCJzdWIiOiI2N2U2OTY5NDE0YmJhNmFlMzEwMDJmMGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VEYRiCzXDO6rLqMKpPCQF8X1TIsaO8k5MdVqf6IyT1A'
        }
      };

      const url = `https://api.themoviedb.org/3/movie/${id}`;
      fetch(url, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
}