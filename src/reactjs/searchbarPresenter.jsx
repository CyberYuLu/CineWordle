

import { observer } from "mobx-react-lite";
import { SearchBarView } from "./SearchBarView";

/**
 *  A dedicted searchbar and view is needed because it has a considerable amount of logic.
 *  Also need some suggesion 
 */

const  SearchBar = observer(function searchRender(props){



    
    function debounce(){
        
    }

    function debouncedSearch(newQuery){
        debounce(newQuery)
    }
    
    //When the user clicks submit on a guess is the current guess set and 
    // other backend logic will initiate.
    function clickButtonACB(){
        if(props.model.currentGuess){
            console.log("Submitting movie id:", props.model.currentGuess);
        }else{
            console.log("No movie has been set. ")
        }
    }

    // Callback for handling when the query changes.
    // Need to be careful to avoid problems with race conditions.
    function handleQueryChange(event){
        const newQuery = event.target.value
        props.model.setSearchQuery(newQuery)
        if(newQuery>= 2){
            debouncedSearch(newQuery)
        }
    };

    // When a movie in the drop down list is selected do we change the selected movie and also populate the search bar. 
    // The suggestions will be full movies.
    function handleSuggestionSelect(movie){
        props.setSearchQuery(movie.title) // will be the title, this will hopefully populate the 
        props.model.setCurrentGuess(movie.id) // will be the ID.
    }

    return (
            <SearchBarView
              query={props.model.query}
              suggestions={suggestions}
              onQueryChange={handleQueryChange}
              onSuggestionSelect={handleSuggestionSelect}
              onSubmitButtonClick = {clickButtonACB}
            />
    )

});


export {SearchBar}