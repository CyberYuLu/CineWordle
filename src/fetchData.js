/**
 * Functions for fetching the data we need from the API.
 * 
 * Start by getting the basics to work, then can we modiy the data with 
 */



/**
 * First function to make sure the API works as expected. It can also be used to get all possible movies to chose from.
 * The possible movies to choose from might need to be filtered as well to avoid to obscure movies.
 * 
 * This code uses the first approach. The criteria are minium budget and sorting by popular.
 * 
 * Like getMovieDetails does it use append_to_response. 
 */
export function getExpectedMovieID({minBudget, popular}){  
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmM4Y2ZlNmIxMWIyMzVlMzRiMjk1YjU2YmJmZGRmOCIsIm5iZiI6MTc0MzE2NTA3Ni4xNzkwMDAxLCJzdWIiOiI2N2U2OTY5NDE0YmJhNmFlMzEwMDJmMGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VEYRiCzXDO6rLqMKpPCQF8X1TIsaO8k5MdVqf6IyT1A'
        }
    };
    
  // 1) Build the discover URL
  let baseUrl = new URL('https://api.themoviedb.org/3/discover/movie');
  if (popular)   baseUrl.searchParams.set('sort_by', 'popularity.desc');


    return fetch(baseUrl, options)
        .then(response => response.json())   // 
        .then(data => {
            let totalPages = data.total_pages; 

            /**
             * Important to restrict the number possible pagew 
             * 
             */
            totalPages = Math.min(20, totalPages) 

            if(totalPages === 0){
                throw new Error('No movies match your criteria');

            }
            // Generate random page number
            const page = Math.floor(Math.random() * totalPages) + 1;
            
            // Fetch the specific random page.
            baseUrl.searchParams.set('page', page);
            return fetch(baseUrl, options);
            
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

              // Fetch the full details of the movie we want with an append. 
              const detailUrl = `https://api.themoviedb.org/3/movie/${randomMovie.id}` +
              `?append_to_response=credits`;
                
              return fetch(detailUrl, options);

              
        }).
        then(response => response.json())
        .then(full => {

            // Map out the directors.
            const directors = full.credits.crew
            .filter(m => m.job === 'Director')
            .map(d => d.name);
    
            //Map out the actors
            const characters = full.credits.cast.map(c => ({
                actor:     c.name,
                character: c.character
              }));
            
              
            // 4) Return the combined movie object
            return {
                id:                   full.id,
                title:                full.title,
                budget:               full.budget,
                original_language:    full.original_language,
                production_companies: full.production_companies,
                production_countries: full.production_countries,
                release_date:         full.release_date,
                poster_path:          full.poster_path,
                overview:             full.overview,
                directors, 
                characters
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
 *  Uses append to response to also get information on credits.
 */
export function getMovieDetails(id){
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NmM4Y2ZlNmIxMWIyMzVlMzRiMjk1YjU2YmJmZGRmOCIsIm5iZiI6MTc0MzE2NTA3Ni4xNzkwMDAxLCJzdWIiOiI2N2U2OTY5NDE0YmJhNmFlMzEwMDJmMGMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VEYRiCzXDO6rLqMKpPCQF8X1TIsaO8k5MdVqf6IyT1A'
        }
      };

      const url = `https://api.themoviedb.org/3/movie/${id}` +
      '?append_to_response=credits';
      return fetch(url, options)
        .then(res => res.json())
        .then(res => {
            
            const details = res;
            const credits = res.credits; 

            // Map out the directors.
            const directors = credits.crew
            .filter(m => m.job === 'Director')
            .map(d => d.name);
    
            //Map out the actors
            const characters = credits.cast.map(c => ({
                actor:     c.name,
                character: c.character
              }));

            return  { 
                    id: details.id,
                    title: details.title, 
                    budget: details.budget, 
                    genres: details.genres, 
                    release_date: details.release_date, 
                    original_language: details.original_language,
                    poster_path: details.poster_path,
                    overview: details.overview,          // An overview of the movie.
                    production_countries: details.production_countries,
                    production_companies: details.production_companies,
                    directors, 
                    characters,

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