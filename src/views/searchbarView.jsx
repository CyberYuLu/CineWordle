

/**
 *  A searchbar view which 
 *  
 */


export function SearchBarView({ props }) {

    function handleSubmitABC(){
        props.onSubmitButtonClick()
    }

    return(
        <div>
        <input type="text" placeholder="enter movie guess" value={props.query} onChange={onQueryChange}/>
        
        {props.query.length > 2 && props.suggestions.length > 0 && (
            <div class="options">
                {props.suggestions.map((movie) =>(
                    <div
                    key={movie.id}
                    onClick={() => onSuggestionSelect(movie)}
                    >
                        {movie.title}
                    </div>

                ))}
            </div>
        )}
        <button onClick={handleSubmitABC}>Submit</button>
        </div>
    );
}
