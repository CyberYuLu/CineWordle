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
 * to avoid obscure movies.
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


    return fetch(baseUrl, options)
        .then(response => response.json())   // 
        .then(data => {
            let totalPages = data.total_pages; 
            totalPages = Math.min(500, totalPages) // at most 500.

            if(totalPages === 0){
                throw new Error('No movies match your criteria');

            }
            // Generate random page number
            const randomPage = Math.floor(Math.random() * totalPages) + 1;
            
            // Fetch the specific random page.
            const pageUrl = `${baseUrl}&page=${randomPage}`;
            return fetch(pageUrl, options);
            
        } ).
        then(response => response.json()).
        // Get a random movie on the page and some error handling. Return if works correctly.
        then(data => {
            if (!data || !data.results || data.results.length === 0) {
                console.log("No movies found on the random page.");
                return;
              }
            
              const randomIndex = Math.floor(Math.random() * data.results.length);
              const randomMovie = data.results[randomIndex]
              console.log("Random Movie:", randomMovie);

              // return an object with the attributes we want. Might need a

              return {  
                id: randomMovie.id,
                title: randomMovie.title, 
                genres: randomMovie.genre_ids,   // A list of genres. Will need to map these to strings. 
                release_date: randomMovie.release_date, 
                poster_path: randomMovie.poster_path,
                overview: randomMovie.overview,          // An overview of the movie.

              };
        });
        // will need to handle the error differentl.
    
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
  return fetch(url, options)
    .then(res => res.json())
    .then(data => {
        if(Array.isArray(data.results)){
            // We are only interested in results the required fields are filled.
            data.results = data.results.filter(movie =>
                            movie.release_date &&
                            movie.poster_path &&
                            movie.overview && movie.genre_ids, 

                       );
            // Also sort the results based on the popularity.
            data.results.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));

        }
        return data;
    })
    .catch(err => {
      console.error(err);
      throw err;
    });
}


/**
 *  Function for getting the specific data based on the id.
 *  For this should we not have 
 */
export function getMovieDetails(id){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmM4Y2ZlNmIxMWIyMzVlMzRiMjk1YjU2YmJmZGRmOCIsIm5iZiI6MTc0MzE2NTA3Ni4xNzkwMDAxLCJzdWIiOiI2N2U2OTY5NDE0YmJhNmFlMzEwMDJmMGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VEYRiCzXDO6rLqMKpPCQF8X1TIsaO8k5MdVqf6IyT1A'
        }
      };

      const url = `https://api.themoviedb.org/3/movie/${id}`;
      return fetch(url, options)
        .then(res => res.json())
        .then(res => {
            // Handle something
            if(!res){
                console.log("No movie with an ID exists"); 
            }
            return  { 
                    id: res.id,
                    title: res.title, 
                    genres: res.genres, 
                    release_date: res.release_date, 
                    poster_path: res.poster_path,
                    overview: res.overview,          // An overview of the movie.

             }

        } )
        .catch(err => console.error(err));
}




/**
 * Need to fetch the genre list. 
 * 
 */
let genreMap = null; 
export function fetchGenreMap(){
    const options = {
        method: 'GET',
     headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmM4Y2ZlNmIxMWIyMzVlMzRiMjk1YjU2YmJmZGRmOCIsIm5iZiI6MTc0MzE2NTA3Ni4xNzkwMDAxLCJzdWIiOiI2N2U2OTY5NDE0YmJhNmFlMzEwMDJmMGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VEYRiCzXDO6rLqMKpPCQF8X1TIsaO8k5MdVqf6IyT1A'
    }
    };
    

    return fetch('https://api.themoviedb.org/3/genre/movie/list?language=en', options)
        .then(res => res.json())
        .then(res  => {
            // genres is an array of objects.s
            genreMap = res.genres.reduce((map, g) => {
                map[g.id] = g.name; 
                return map;
            }, {})
            return genreMap;

        })
        .catch(err => console.error(err));
}